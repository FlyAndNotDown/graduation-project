#include "test.h"
#include "tool.h"
#include <armadillo>
using namespace arma;
using namespace watermark;

void test::tool_print_mat() {
    mat matrix(5, 5);
    auto rows = matrix.n_rows;
    auto cols = matrix.n_cols;
    for (uword i = 0; i < rows; i++) {
        for (uword j = 0; j < cols; j++) {
            matrix(i, j) = i * rows + j;
        }
    }
    
    tool::print_mat("source", matrix);
}

void test::tool_print_cx_mat() {
    cx_mat matrix(5, 5);
    auto rows = matrix.n_rows;
    auto cols = matrix.n_cols;
    for (uword i = 0; i < rows; i++) {
        for (uword j = 0; j < cols; j++) {
            cx_double temp(i * rows + j, i * rows + j);
            matrix(i, j) = temp;
        }
    }

    tool::print_cx_mat("source", matrix);
}

void test:: tool_mat_to_cx_mat() {}