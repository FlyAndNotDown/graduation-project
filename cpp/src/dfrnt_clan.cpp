#include "dfrnt_clan.h"
#include "define.h"
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
        cx_double cx(0, -2.0 * PI * i * order / cycle);
        center_matrix(i, i) = cx;
    }

    // get kernel matrix
    return orth_vectors * center_matrix * orth_vectors.t();
}

cx_vec dfrnt_clan::dfrnt(cx_vec source, cx_mat kernel) {
    // return result
    return kernel * source;
}

cx_mat dfrnt_clan::dfrnt2(cx_mat source, unsigned int length, cx_mat kernel) {
    // init output
    cx_mat output = source;

    // do dfrnt to every row
    for (unsigned int i = 0; i < length; i++) {
        output.row(i) = dfrnt_clan::dfrnt(output.row(i).t(), kernel).t();
    }

    // do dfrnt to every col
    for (unsigned int i = 0; i < length; i++) {
        output.col(i) = dfrnt_clan::dfrnt(output.col(i), kernel);
    }

    // return result
    return output;
}

cube dfrnt_clan::lqdfrnt(cube source, cx_mat kernel, vec unit_pure_quaternion) {
    // get every channel of vector
    auto source_r = source.slice(0);
    auto source_i = source.slice(1);
    auto source_j = source.slice(2);
    auto source_k = source.slice(3);

    // get three imag part of unit pure quaternion
    auto ua = unit_pure_quaternion.at(1);
    auto ub = unit_pure_quaternion.at(2);
    auto uc = unit_pure_quaternion.at(3);

    // do the 1-d dfrnt to every channel
    auto output_r = dfrnt_clan::dfrnt(source_r, kernel);
    auto output_i = dfrnt_clan::dfrnt(source_i, kernel);
    auto output_j = dfrnt_clan::dfrnt(source_j, kernel);
    auto output_k = dfrnt_clan::dfrnt(source_k, kernel);
    
    // get real part and imag part
    mat output_real_r = real(output_r);
    mat output_real_i = real(output_i);
    mat output_real_j = real(output_j);
    mat output_real_k = real(output_k);
    mat output_imag_r = imag(output_r);
    mat output_imag_i = imag(output_i);
    mat output_imag_j = imag(output_j);
    mat output_imag_k = imag(output_k);

    // init output
    auto output = source;
    output.slice(0) = output_real_r - output_imag_i * ua - output_imag_j * ub - output_imag_k * uc;
    output.slice(1) = output_real_i + output_imag_r * ua - output_imag_j * uc + output_imag_k * ub;
    output.slice(2) = output_real_j + output_imag_r * ub - output_imag_k * ua + output_imag_i * uc;
    output.slice(3) = output_real_k + output_imag_r * uc - output_imag_i * ub + output_imag_j * ua;

    // return result
    return output;
}