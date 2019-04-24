#include "qdfrnt.h"

static cx_mat QDFRNT::dfrntKernel(double order, double cycle, mat randomMatrix) {
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
		complex<double> cx;
		cx.real = 0;
		cx.imag = -2 * PI * (i - 1) * order / cycle;
		diagVector(i) = exp(cx);
	}
	cx_mat centerMatrix(rows, rows, fill::zeros);
	centerMatrix.diag() = diagVector;

	// reutrn result
	return orthVectors * centerMatrix * orthVectors.t();
}