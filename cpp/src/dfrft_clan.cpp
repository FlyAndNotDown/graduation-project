#include "dfrft_clan.h"
#include "define.h"
#include "tool.h"
#include <armadillo>
using namespace arma;
using namespace watermark;

cx_mat dfrft_clan::kernel(uword length, double order) {
	// get even status
	bool even = length % 2 == 0;

	// do hermite sample
	vec xf(length, fill::zeros);
	double start = 0 - length * 1.0 / 2;
	for (uword i = 0; i < length; i++) {
		xf(i) = (start + i) / sqrt(length * 1.0 / (2 * PI));
	}
	vec ef(length, fill::zeros);
	for (uword i = 0; i < length; i++) {
		ef(i) = exp(0 - pow(xf(i), 2) * 1.0 / 2);
	}
	mat u(length, length + 1, fill::zeros);
	u.col(0) = ef;
	double m1 = norm(u.col(0));
	u.col(0) = u.col(0) / m1;
	u.col(1) = 2 * xf % ef;
	double m2 = norm(u.col(1));
	u.col(1) = u.col(1) / m2;
	m1 = m2 / m1;
	for (uword i = 2; i <= length; i++) {
		u.col(i) = 2 * m1 * xf % u.col(i - 1) - 2 * (i - 1) * u.col(i - 2);
		m2 = norm(u.col(i));
		u.col(i) = u.col(i) / m2;
		m1 = m2 / m1;
	}

	// do remove and shift
	if (even) {
		vec temp = u.col(length);
		u = u.cols(0, length - 2);
		u.insert_cols(length - 1, temp);
	} else {
		u = u.cols(0, length - 1);
	}
	u = shift(u, length / 2);

	// get DFT eigenvectors
	mat s(length, length, fill::zeros);
	vec diag_source1(length, fill::zeros);
	for (uword i = 0; i < length; i++) {
		diag_source1(i) = 2 * cos(i * 2.0 * PI / length);
	}
	vec diag_source2(length - 1, fill::zeros);
	for (uword i = 1; i < length; i++) {
		diag_source2(i - 1) = 1;
	}
	s.diag() = diag_source1;
	s.diag(1) = diag_source2;
	s.diag(-1) = diag_source2;
	s(0, length - 1) = 1;
	s(length - 1, 0) = 1;
	cx_vec cx_eig_values;
	cx_mat cx_eig_vectors;
	eig_gen(cx_eig_values, cx_eig_vectors, s);
	mat evs = real(cx_eig_vectors);
	evs = orth(evs);

	// do project from hermite space to DFT space
	/* for (uword n = 0; n < 4; n++) {
		uword locations_length = (length - n - 1) / 4;
		vec locations(locations_length, fill::zeros);
		for (uword i = 0; i < locations_length; i++) {
			locations(i) = n + 4 * i;
		}
		
		mat evs_some(length, locations_length, fill::zeros);
		for (uword i = 0; i < locations_length; i++) {
			evs_some.col(i) = evs.col(locations(i));
		}
		mat u_some(length, locations_length, fill::zeros);
		for (uword i = 0; i < locations_length; i++) {
			u_some.col(i) = u.col(locations(i));
		}
		mat u_orth = orth(evs_some * evs_some.t() * u_some);
		uword dis = locations_length - u_orth.n_cols;
		u_orth = join_horiz(u_orth, zeros<mat>(length, dis));
		for (uword i = 0; i < locations_length; i++) {
			u.col(locations(i)) = u_orth.col(i);
		}
	} */
	u = orth(evs * u * evs.t());

	// get matrix d
	cx_mat d(length + 1, length + 1, fill::zeros);
	for (uword i = 0; i <= length; i++) {
		cx_double cx_temp(0, 0 - order * i);
		d(i, i) = exp(cx_temp);
	}
	if (even) {
		cx_vec temp1 = d.col(length);
		d = d.cols(0, length - 2);
		d.insert_cols(length - 1, temp1);
		cx_mat temp2 = d.row(length);
		d = d.rows(0, length - 2);
		d.insert_rows(length - 1, temp2);
	}
	else {
		d = d.cols(0, length - 1);
		d = d.rows(0, length - 1);
	}

	// return kernel
	return u * d * u.t();
}

cx_mat dfrft_clan::dfrft(cx_mat source, cx_mat kernel) {
	// get size info
	uword rows = source.n_rows;
	uword cols = source.n_cols;

	// switch via vector type
	if (cols == 1) {
		// if it's a col vector, just do transform
		// return shift(kernel * shift(source, rows / 2), rows / 2);
		return kernel * source;
	} else if (rows == 1) {
		// if it's a row vector, transport it and do transform
		// return shift(kernel * shift(source.t(), cols / 2, 1).t(), cols / 2, 1);
		return (kernel * source.t()).t();
	} else {
		// return nothing
		cx_mat output(rows, cols, fill::zeros);
		return output;
	}
}

cx_mat dfrft_clan::dfrft2(cx_mat source, cx_mat kernel) {
	// get size info
	uword length = source.n_rows;
	if (length != source.n_cols) {
		return nullptr;
	}

	// init output
	cx_mat output(source);

	// do DFRFT to every row
	for (uword i = 0; i < length; i++) {
		output.row(i) = dfrft_clan::dfrft(output.row(i), kernel);
	}

	// do DFRFT to every col
	for (uword i = 0; i < length; i++) {
		output.col(i) = dfrft_clan::dfrft(output.col(i), kernel);
	}

	// return result
	return output;
}

cube dfrft_clan::qdfrft(cube source, cx_mat kernel, vec unit_pure_quaternion) {
	if (source.n_slices != 4) {
		cube t(source.n_rows, source.n_cols, source.n_slices, fill::zeros);
		return t;
	}

	// split source matrix to 4 channels
	mat source_r = source.slice(0);
	mat source_k = source.slice(1);
	mat source_j = source.slice(2);
	mat source_i = source.slice(3);

	// get three imag part of unit pure quaternion
	double ua = unit_pure_quaternion.at(1);
	double ub = unit_pure_quaternion.at(2);
	double uc = unit_pure_quaternion.at(3);

	// // do DFRFT to every channel
	cx_mat output_r = dfrft_clan::dfrft(tool::mat_to_cx_mat(source_r), kernel);
	cx_mat output_i = dfrft_clan::dfrft(tool::mat_to_cx_mat(source_i), kernel);
	cx_mat output_j = dfrft_clan::dfrft(tool::mat_to_cx_mat(source_j), kernel);
	cx_mat output_k = dfrft_clan::dfrft(tool::mat_to_cx_mat(source_k), kernel);

	// get real part and imag part of output
	mat output_r_real = real(output_r);
	mat output_r_imag = imag(output_r);
	mat output_i_real = real(output_i);
	mat output_i_imag = imag(output_i);
	mat output_j_real = real(output_j);
	mat output_j_imag = imag(output_j);
	mat output_k_real = real(output_k);
	mat output_k_imag = imag(output_k);

	// get output
	cube output(source);
	output.slice(0) = output_r_real - output_i_imag * ua - output_j_imag * ub - output_k_imag * uc;
	output.slice(3) = output_i_real + output_r_imag * ua - output_j_imag * uc + output_k_imag * ub;
	output.slice(2) = output_j_real + output_r_imag * ub - output_k_imag * ua + output_i_imag * uc;
	output.slice(1) = output_k_real + output_r_imag * uc - output_i_imag * ub + output_j_imag * ua;

	// return it
	return output;
}

cube dfrft_clan::qdfrft2(cube source, cx_mat kernel, vec unit_pure_quaternion) {
	if (source.n_slices != 4 || source.n_rows != source.n_cols) {
		cube t(source.n_rows, source.n_cols, source.n_slices, fill::zeros);
		return t;
	}

	// split source matrix to 4 channels
	mat source_r = source.slice(0);
	mat source_k = source.slice(1);
	mat source_j = source.slice(2);
	mat source_i = source.slice(3);

	// get three imag part of unit pure quaternion
	double ua = unit_pure_quaternion.at(1);
	double ub = unit_pure_quaternion.at(2);
	double uc = unit_pure_quaternion.at(3);

	// // do DFRFT to every channel
	cx_mat output_r = dfrft_clan::dfrft2(tool::mat_to_cx_mat(source_r), kernel);
	cx_mat output_i = dfrft_clan::dfrft2(tool::mat_to_cx_mat(source_i), kernel);
	cx_mat output_j = dfrft_clan::dfrft2(tool::mat_to_cx_mat(source_j), kernel);
	cx_mat output_k = dfrft_clan::dfrft2(tool::mat_to_cx_mat(source_k), kernel);

	// get real part and imag part of output
	mat output_r_real = real(output_r);
	mat output_r_imag = imag(output_r);
	mat output_i_real = real(output_i);
	mat output_i_imag = imag(output_i);
	mat output_j_real = real(output_j);
	mat output_j_imag = imag(output_j);
	mat output_k_real = real(output_k);
	mat output_k_imag = imag(output_k);

	// get output
	cube output(source);
	output.slice(0) = output_r_real - output_i_imag * ua - output_j_imag * ub - output_k_imag * uc;
	output.slice(3) = output_i_real + output_r_imag * ua - output_j_imag * uc + output_k_imag * ub;
	output.slice(2) = output_j_real + output_r_imag * ub - output_k_imag * ua + output_i_imag * uc;
	output.slice(1) = output_k_real + output_r_imag * uc - output_i_imag * ub + output_j_imag * ua;

	// return it
	return output;
}