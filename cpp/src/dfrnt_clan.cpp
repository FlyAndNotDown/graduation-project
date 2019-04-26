#include "dfrnt_clan.h"
#include "tool.h"
#include "define.h"
#include <armadillo>
using namespace arma;
using namespace watermark;
using namespace std;

cx_mat dfrnt_clan::kernel(double order, double cycle, mat random_matrix) {
	uword length = random_matrix.n_rows;
	if (length != random_matrix.n_cols) {
		return nullptr;
	}
	
	// calculate the random symmetrical matrix
    mat symmetrical_matrix = (random_matrix + random_matrix.t()) / 2;

    // get eig vectors
    cx_vec cx_eig_values;
    cx_mat cx_eig_vectors;
    mat eig_vectors;
    eig_gen(cx_eig_values, cx_eig_vectors, symmetrical_matrix);
    eig_vectors = real(cx_eig_vectors);

    // get orthogonal matrix
    mat orthogonal_matrix = orth(eig_vectors);

    // get the center matrix
    cx_mat center_matrix(length, length, fill::zeros);
    for (uword i = 0; i < length; i++) {
        cx_double temp(0, -2 * PI * i * order / cycle);
        center_matrix(i, i) = exp(temp);
    }

    // get result
    return orthogonal_matrix * center_matrix * orthogonal_matrix.t();
}

cx_mat dfrnt_clan::dfrnt(cx_mat source, cx_mat kernel) {
	// judge size info
	uword rows = source.n_rows;
	uword cols = source.n_cols;

	// switch via vector type
	if (cols == 1) {
		// if it's a col vector, just do transform
		return kernel * source;
	} else if (rows == 1) {
		// if it's a row vector, transport it and do transform
		return (kernel * source.t()).t();
	} else {
		// return nothing
		cx_mat output(rows, cols, fill::zeros);
		return output;
	}
}

cx_mat dfrnt_clan::dfrnt2(cx_mat source, cx_mat kernel) {
	// get size info
	uword length = source.n_rows;
	if (length != source.n_cols) {
		return nullptr;
	}

	// init output
	cx_mat output(source);

	// do DFRNT to every row
	for (uword i = 0; i < length; i++) {
		output.row(i) = dfrnt_clan::dfrnt(output.row(i), kernel);
	}

	// do DFRNT to every col
	for (uword i = 0; i < length; i++) {
		output.col(i) = dfrnt_clan::dfrnt(output.col(i), kernel);
	}

	// return result
	return output;
}

cube dfrnt_clan::qdfrnt(cube source, cx_mat kernel, vec unit_pure_quaternion) {
	if (source.n_slices != 4) {
		cube t(source.n_rows, source.n_cols, source.n_slices, fill::zeros);
		return t;
	}
	
	// split source matrix to 4 channels
	mat source_r = source.slice(0);
	mat source_i = source.slice(1);
	mat source_j = source.slice(2);
	mat source_k = source.slice(3);

	// get three imag part of unit pure quaternion
	double ua = unit_pure_quaternion.at(1);
	double ub = unit_pure_quaternion.at(2);
	double uc = unit_pure_quaternion.at(3);

	// // do DFRNT to every channel
	cx_mat output_r = dfrnt_clan::dfrnt(tool::mat_to_cx_mat(source_r), kernel);
	cx_mat output_i = dfrnt_clan::dfrnt(tool::mat_to_cx_mat(source_i), kernel);
	cx_mat output_j = dfrnt_clan::dfrnt(tool::mat_to_cx_mat(source_j), kernel);
	cx_mat output_k = dfrnt_clan::dfrnt(tool::mat_to_cx_mat(source_k), kernel);

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
	output.slice(1) = output_i_real + output_r_imag * ua - output_j_imag * uc + output_k_imag * ub;
	output.slice(2) = output_j_real + output_r_imag * ub - output_k_imag * ua + output_i_imag * uc;
	output.slice(3) = output_k_real + output_r_imag * uc - output_i_imag * ub + output_j_imag * ua;

	// return it
	return output;
}

cube dfrnt_clan::qdfrnt2(cube source, cx_mat kernel, vec unit_pure_quaternion) {
	if (source.n_slices != 4 || source.n_rows != source.n_cols) {
		cube t(source.n_rows, source.n_cols, source.n_slices, fill::zeros);
		return t;
	}

	// split source matrix to 4 channels
	mat source_r = source.slice(0);
	mat source_i = source.slice(1);
	mat source_j = source.slice(2);
	mat source_k = source.slice(3);

	// get three imag part of unit pure quaternion
	double ua = unit_pure_quaternion.at(1);
	double ub = unit_pure_quaternion.at(2);
	double uc = unit_pure_quaternion.at(3);

	// // do DFRNT to every channel
	cx_mat output_r = dfrnt_clan::dfrnt2(tool::mat_to_cx_mat(source_r), kernel);
	cx_mat output_i = dfrnt_clan::dfrnt2(tool::mat_to_cx_mat(source_i), kernel);
	cx_mat output_j = dfrnt_clan::dfrnt2(tool::mat_to_cx_mat(source_j), kernel);
	cx_mat output_k = dfrnt_clan::dfrnt2(tool::mat_to_cx_mat(source_k), kernel);

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
	output.slice(1) = output_i_real + output_r_imag * ua - output_j_imag * uc + output_k_imag * ub;
	output.slice(2) = output_j_real + output_r_imag * ub - output_k_imag * ua + output_i_imag * uc;
	output.slice(3) = output_k_real + output_r_imag * uc - output_i_imag * ub + output_j_imag * ua;

	// return it
	return output;
}