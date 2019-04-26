#include "tool.h"
using namespace watermark;
using namespace std;

void tool::print_mat(char *name, mat matrix) {
    uword rows = matrix.n_rows;
    uword cols = matrix.n_cols;

    cout << name << ":" << endl;
    for (uword i = 0; i < rows; i++) {
        for (uword j = 0; j < cols; j++) {
            cout << matrix.at(i, j) << "\t";
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
            auto temp = matrix.at(i, j);
            cout << temp.real() << ", " << temp.imag() << "\t";
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