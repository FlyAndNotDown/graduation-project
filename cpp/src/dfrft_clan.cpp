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
	tool::print_mat("hermite sample", u);

	if (even) {
		vec temp = u.col(length);
		u = u.cols(0, length - 2);
		u.insert_cols(length - 1, temp);
	} else {
		u = u.cols(0, length - 1);
	}

	tool::print_mat("hermite sample", u);

	u = shift(u, length / 2);

	tool::print_mat("hermite sample", u);

	// TODO

	return nullptr;
}