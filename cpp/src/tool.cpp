#include "tool.h"

void tool::print_mat_data(mat matrix) {
	auto rows = matrix.n_rows;
	auto cols = matrix.n_cols;
	
	for (int i = 0; i < rows; i++) {
		for (int j = 0; j < cols; j++) {
			cout << matrix.at(i, j) << " ";
		}
		cout << endl;
	}
	cout << endl;
}

void tool::print_cx_mat_data(cx_mat matrix) {
	auto rows = matrix.n_rows;
	auto cols = matrix.n_cols;

	for (int i = 0; i < rows; i++) {
		for (int j = 0; j < cols; j++) {
			cout << matrix.at(i, j).real() << ", " << matrix.at(i, j).imag() << "i" << "   ";
		}
		cout << endl;
	}
	cout << endl;
}