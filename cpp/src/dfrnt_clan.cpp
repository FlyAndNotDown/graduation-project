#include "dfrnt_clan.h"
#include "tool.h"
#include "define.h"
#include <armadillo>
using namespace arma;
using namespace watermark;
using namespace std;

cx_mat dfrnt_clan::kernel(double order, double cycle, uword length, mat random_matrix) {
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