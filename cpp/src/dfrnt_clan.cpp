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
		return nullptr;
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