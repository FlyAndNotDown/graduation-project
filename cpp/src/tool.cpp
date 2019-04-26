#include "tool.h"
#include <iostream>
using namespace watermark;
using namespace std;

void tool::print_mat(char *name, mat matrix) {
    uword rows = matrix.n_rows;
    uword cols = matrix.n_cols;

    cout << name << ":" << endl;
    for (uword i = 0; i < rows; i++) {
        for (uword j = 0; j < cols; j++) {
            cout << matrix.at(i, j) << "    ";
        }
        cout << endl;
    }
    cout << endl;
}

void tool::print_cx_mat(char *name, cx_mat matrix) {
    uword rows = matrix.n_rows;
    uword cols = matrix.n_cols;

    cout << name << ":" << endl;
    for (uword i = 0; i < rows; i++) {
        for (uword j = 0; j < cols; j++) {
            cx_double temp = matrix.at(i, j);
            cout << temp.real() << ", " << temp.imag() << "    ";
        }
        cout << endl;
    }
    cout << endl;
}

void tool::print_cube(char *name, cube matrix) {
	uword rows = matrix.n_rows;
	uword cols = matrix.n_cols;
	uword channels = matrix.n_slices;

	cout << name << ":" << endl;
	for (uword i = 0; i < channels; i++) {
		cout << "channel " << i << ":" << endl;
		for (uword j = 0; j < rows; j++) {
			for (uword k = 0; k < cols; k++) {
				cout << matrix.at(j, k, i) << "    ";
			}
			cout << endl;
		}
		cout << endl;
	}
	cout << endl;
}

void tool::print_cx_cube(char *name, cx_cube matrix) {
	uword rows = matrix.n_rows;
	uword cols = matrix.n_cols;
	uword channels = matrix.n_slices;

	cout << name << ":" << endl;
	for (uword i = 0; i < channels; i++) {
		cout << "channel " << i << ":" << endl;
		for (uword j = 0; j < rows; j++) {
			for (uword k = 0; k < cols; k++) {
				cx_double temp = matrix.at(j, k, i);
				cout << temp.real() << ", " << temp.imag() << "    ";
			}
			cout << endl;
		}
		cout << endl;
	}
	cout << endl;
}

cx_mat tool::mat_to_cx_mat(mat matrix) {
    mat imag_mat(matrix.n_rows, matrix.n_cols, fill::zeros);
    cx_mat output(matrix, imag_mat);
    return output;
}