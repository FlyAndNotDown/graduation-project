#include "dfrnt_clan.h"
using namespace watermark;

cx_mat dfrnt_clan::kernel(double order, double cycle, mat random_matrix) {
    // get size info
    auto rows = random_matrix.n_rows;

    // get symmetrical matrix
    auto symmetrical_matrix = (random_matrix + random_matrix.t()) / 2;

    // get random eigen matrix
    cx_vec cx_eigen_values;
    cx_mat cx_eigen_vectors;
    eig_gen(cx_eigen_values, cx_eigen_vectors, symmetrical_matrix);
    auto eigen_vectors = real(cx_eigen_vectors);

    // orth it
    auto orth_vectors = orth(eigen_vectors);

    // get center matrix
    cx_mat center_matrix(rows, rows, fill::zeros);
    for (auto i = 0; i < rows; i++) {
        // TODO
    }
}