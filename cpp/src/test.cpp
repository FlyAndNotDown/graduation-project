#include "test.h"
#include "tool.h"
#include "dfrnt_clan.h"
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

void test::tool_mat_to_cx_mat() {
    mat matrix(5, 5);
    auto rows = matrix.n_rows;
    auto cols = matrix.n_cols;
    for (uword i = 0; i < rows; i++) {
        for (uword j = 0; j < cols; j++) {
            matrix(i, j) = i * rows + j;
        }
    }

    tool::print_cx_mat("source", tool::mat_to_cx_mat(matrix));
}

void test::dfrnt_clan_kernel() {
    cx_mat kernel = dfrnt_clan::kernel(0.25, 1, randn(4, 4));

    tool::print_cx_mat("kernel", kernel);
}

void test::dfrnt_clan_dfrnt() {
	uword length = 5;
	mat source_real1(length, 1, fill::zeros), source_real2(1, length, fill::zeros);
	for (uword i = 0; i < length; i++) {
		source_real1(i, 0) = i;
		source_real2(0, i) = i;
	}

	cx_mat source1 = tool::mat_to_cx_mat(source_real1);
	cx_mat source2 = tool::mat_to_cx_mat(source_real2);

	tool::print_cx_mat("source1", source1);
	tool::print_cx_mat("source2", source2);

	mat random_matrix = randn(length, length);
	cx_mat kernel = dfrnt_clan::kernel(0.25, 1, random_matrix);
	cx_mat i_kernel = dfrnt_clan::kernel(-0.25, 1, random_matrix);
	cx_mat output1 = dfrnt_clan::dfrnt(source1, kernel);
	cx_mat output2 = dfrnt_clan::dfrnt(source2, kernel);

	tool::print_cx_mat("output1", output1);
	tool::print_cx_mat("output2", output2);

	cx_mat cycle1 = dfrnt_clan::dfrnt(output1, kernel);
	cycle1 = dfrnt_clan::dfrnt(cycle1, kernel);
	cycle1 = dfrnt_clan::dfrnt(cycle1, kernel);
	cx_mat cycle2 = dfrnt_clan::dfrnt(output2, kernel);
	cycle2 = dfrnt_clan::dfrnt(cycle2, kernel);
	cycle2 = dfrnt_clan::dfrnt(cycle2, kernel);

	tool::print_cx_mat("cycle1", cycle1);
	tool::print_cx_mat("cycle2", cycle2);

	cx_mat restored1 = dfrnt_clan::dfrnt(output1, i_kernel);
	cx_mat restored2 = dfrnt_clan::dfrnt(output2, i_kernel);

	tool::print_cx_mat("restored1", restored1);
	tool::print_cx_mat("restored2", restored2);
}

void test::dfrnt_clan_dfrnt2() {
	uword length = 5;
	mat source_real(length, length, fill::zeros);
	for (uword i = 0; i < length; i++) {
		for (uword j = 0; j < length; j++) {
			source_real(i, j) = i * length + j;
		}
	}
	cx_mat source = tool::mat_to_cx_mat(source_real);

	mat random_matrix = randn(length, length);
	cx_mat kernel = dfrnt_clan::kernel(0.25, 1, random_matrix);
	cx_mat inverse_kernel = dfrnt_clan::kernel(-0.25, 1, random_matrix);
	cx_mat output = dfrnt_clan::dfrnt2(source, kernel);
	cx_mat restored = dfrnt_clan::dfrnt2(output, inverse_kernel);
	cx_mat cycle = dfrnt_clan::dfrnt2(output, kernel);
	cycle = dfrnt_clan::dfrnt2(cycle, kernel);
	cycle = dfrnt_clan::dfrnt2(cycle, kernel);

	tool::print_cx_mat("kernel", kernel);
	tool::print_cx_mat("source", source);
	tool::print_cx_mat("output", output);
	tool::print_cx_mat("cycle", cycle);
	tool::print_cx_mat("restored", restored);
}