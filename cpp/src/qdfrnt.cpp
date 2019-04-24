#include "qdfrnt.h"

cx_mat qdfrnt::kernel(double order, double cycle, mat randomMatrix) {
	// get size info
	auto rows = randomMatrix.n_rows;
	auto cols = randomMatrix.n_cols;
	if (rows != cols) { return nullptr; }

	// calculate the random symmetrical matrix
	mat randomSymMatrix = (randomMatrix + randomMatrix.t()) / 2;

	// get random eigen matrix
	cx_vec eigenValues;
	cx_mat cxEigenVectors;
	mat eigenVectors;
	eig_gen(eigenValues, cxEigenVectors, randomSymMatrix);
	eigenVectors = real(cxEigenVectors);

	// orth it
	mat orthVectors = orth(eigenVectors);

	// get center matrix
	cx_vec diagVector(rows);
	for (int i = 0; i < rows; i++) {
		complex<double> cx(0, -2 * PI * (i - 1) * order / cycle);
		diagVector(i) = exp(cx);
	}
	cx_mat centerMatrix(rows, rows, fill::zeros);
	centerMatrix.diag() = diagVector;

	// reutrn result
	return orthVectors * centerMatrix * orthVectors.t();
}

cx_vec qdfrnt::dfrnt(cx_vec vector, cx_mat kernel) {
	// return result
	return kernel * vector;
}

cx_mat qdfrnt::dfrnt2(cx_mat matrix, int length, cx_mat kernel) {
	// init output
	cx_mat output(length, length, fill::zeros);

	// copy
	output = matrix;

	// for every row
	for (int i = 0; i < length; i++) {
		output.row(i) = qdfrnt::dfrnt(output.row(i).t(), kernel).t();
	}

	// for every col
	for (int i = 0; i < length; i++) {
		output.col(i) = qdfrnt::dfrnt(output.col(i), kernel);
	}

	// return result
	return output;
}