#include "test.h"
#include "tool.h"
#include "dfrnt_clan.h"
#include <armadillo>
using namespace arma;
using namespace watermark;

void test::tool_print_mat() {
    mat matrix(5, 5);
    uword rows = matrix.n_rows;
	uword cols = matrix.n_cols;
    for (uword i = 0; i < rows; i++) {
        for (uword j = 0; j < cols; j++) {
            matrix(i, j) = i * cols + j;
        }
    }
    
    tool::print_mat("source", matrix);
}

void test::tool_print_cx_mat() {
    cx_mat matrix(5, 5);
	uword rows = matrix.n_rows;
	uword cols = matrix.n_cols;
    for (uword i = 0; i < rows; i++) {
        for (uword j = 0; j < cols; j++) {
            cx_double temp(i * cols + j, i * cols + j);
            matrix(i, j) = temp;
        }
    }

    tool::print_cx_mat("source", matrix);
}

void test::tool_mat_to_cx_mat() {
    mat matrix(5, 5);
	uword rows = matrix.n_rows;
	uword cols = matrix.n_cols;
    for (uword i = 0; i < rows; i++) {
        for (uword j = 0; j < cols; j++) {
            matrix(i, j) = i * cols + j;
        }
    }

    tool::print_cx_mat("source", tool::mat_to_cx_mat(matrix));
}

void test::tool_print_cube() {
	cube matrix(5, 5, 4);
	uword rows = matrix.n_rows;
	uword cols = matrix.n_cols;
	uword channels = matrix.n_slices;
	for (uword i = 0; i < channels; i++) {
		for (uword j = 0; j < rows; j++) {
			for (uword k = 0; k < cols; k++) {
				matrix(j, k, i) = i * 100 + j * cols + k;
			}
		}
	}

	tool::print_cube("source", matrix);
}

void test::tool_print_cx_cube() {
	cx_cube matrix(5, 5, 4);
	uword rows = matrix.n_rows;
	uword cols = matrix.n_cols;
	uword channels = matrix.n_slices;
	for (uword i = 0; i < channels; i++) {
		for (uword j = 0; j < rows; j++) {
			for (uword k = 0; k < cols; k++) {
				cx_double temp(i * 100 + j * cols + k, i * 100 + j * cols + k);
				matrix(j, k, i) = temp;
			}
		}
	}

	tool::print_cx_cube("source", matrix);
}

void test::tool_cube_to_cx_cube() {
	cube matrix(5, 5, 4);
	uword rows = matrix.n_rows;
	uword cols = matrix.n_cols;
	uword channels = matrix.n_slices;
	for (uword i = 0; i < channels; i++) {
		for (uword j = 0; j < rows; j++) {
			for (uword k = 0; k < cols; k++) {
				matrix(j, k, i) = i * 100 + j * cols + k;
			}
		}
	}

	tool::print_cx_cube("source", tool::cube_to_cx_cube(matrix));
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

void test::dfrnt_clan_qdfrnt() {
	uword length = 5;
	uword channels = 4;
	cube source1(1, length, channels, fill::zeros);
	cube source2(length, 1, channels, fill::zeros);
	for (uword i = 0; i < channels; i++) {
		for (uword j = 0; j < length; j++) {
			source1(0, j, i) = i * 100 + j;
			source2(j, 0, i) = i * 100 + j;
		}
	}

	tool::print_cube("source1", source1);
	tool::print_cube("source2", source2);

	vec unit_pure_quaternion(4, fill::zeros);
	unit_pure_quaternion(1) = 1;
	mat random_matrix = randn(length, length);
	cx_mat kernel = dfrnt_clan::kernel(0.25, 1, random_matrix);
	cx_mat inverse_kernel = dfrnt_clan::kernel(-0.25, 1, random_matrix);
	
	cube output1 = dfrnt_clan::qdfrnt(source1, kernel, unit_pure_quaternion);
	cube output2 = dfrnt_clan::qdfrnt(source2, kernel, unit_pure_quaternion);
	cube restored1 = dfrnt_clan::qdfrnt(output1, inverse_kernel, unit_pure_quaternion);
	cube restored2 = dfrnt_clan::qdfrnt(output2, inverse_kernel, unit_pure_quaternion);
	cube cycle1 = dfrnt_clan::qdfrnt(output1, kernel, unit_pure_quaternion);
	cycle1 = dfrnt_clan::qdfrnt(cycle1, kernel, unit_pure_quaternion);
	cycle1 = dfrnt_clan::qdfrnt(cycle1, kernel, unit_pure_quaternion);
	cube cycle2 = dfrnt_clan::qdfrnt(output2, kernel, unit_pure_quaternion);
	cycle2 = dfrnt_clan::qdfrnt(cycle2, kernel, unit_pure_quaternion);
	cycle2 = dfrnt_clan::qdfrnt(cycle2, kernel, unit_pure_quaternion);

	tool::print_cube("output1", output1);
	tool::print_cube("output2", output2);
	tool::print_cube("restored1", restored1);
	tool::print_cube("restored2", restored2);
	tool::print_cube("cycle1", cycle1);
	tool::print_cube("cycle2", cycle2);
}

void test::dfrnt_clan_qdfrnt2() {
	uword length = 5;
	uword channels = 4;
	cube source(length, length, channels, fill::zeros);
	for (uword i = 1; i < channels; i++) {
		for (uword j = 0; j < length; j++) {
			for (uword k = 0; k < length; k++) {
				source(j, k, i) = i * 100 + j * length + k;
			}
		}
	}

	tool::print_cube("source", source);

	vec unit_pure_quaternion(4, fill::zeros);
	unit_pure_quaternion(1) = 1;
	mat random_matrix = randn(length, length);
	cx_mat kernel = dfrnt_clan::kernel(0.25, 1, random_matrix);
	cx_mat inverse_kernel = dfrnt_clan::kernel(-0.25, 1, random_matrix);

	cube output = dfrnt_clan::qdfrnt2(source, kernel, unit_pure_quaternion);
	cube restored = dfrnt_clan::qdfrnt2(output, inverse_kernel, unit_pure_quaternion);
	cube cycle = dfrnt_clan::qdfrnt2(output, kernel, unit_pure_quaternion);
	cycle = dfrnt_clan::qdfrnt2(cycle, kernel, unit_pure_quaternion);
	cycle = dfrnt_clan::qdfrnt2(cycle, kernel, unit_pure_quaternion);

	tool::print_cube("output", output);
	tool::print_cube("restored", restored);
	tool::print_cube("cycle", cycle);
}

void test::tool_read_write_image(char *path, char *output_path) {
	mat matrix = tool::read_image_to_mat(path);
	tool::save_mat_to_image(output_path, matrix);
}

void test::tool_read_write_color_image(char *path, char *output_path) {
	cube matrix = tool::read_image_to_cube(path);
	tool::save_cube_to_image(output_path, matrix);
}

void test::image_qdfrnt2(char *path, char *output_path, char *restored_path, char *cycle_path) {
	cube matrix = tool::read_image_to_cube(path);
	
	uword blocks_length = tool::get_blocks_length(matrix, 8);
	cube *blocks = new cube[blocks_length];
	cube *outputs = new cube[blocks_length];
	cube *cycles = new cube[blocks_length];
	cube *restoreds = new cube[blocks_length];
	tool::split_to_blocks(matrix, 8, blocks);

	vec unit_pure_quaternion(4, fill::zeros);
	unit_pure_quaternion(1) = 1;
	mat random_matrix = randn(8, 8);
	cx_mat kernel = dfrnt_clan::kernel(0.25, 1, random_matrix);
	cx_mat inverse_kernel = dfrnt_clan::kernel(-0.25, 1, random_matrix);

	for (uword i = 0; i < blocks_length; i++) {
		outputs[i] = dfrnt_clan::qdfrnt2(blocks[i], kernel, unit_pure_quaternion);
		restoreds[i] = dfrnt_clan::qdfrnt2(outputs[i], inverse_kernel, unit_pure_quaternion);
		cycles[i] = dfrnt_clan::qdfrnt2(outputs[i], kernel, unit_pure_quaternion);
		cycles[i] = dfrnt_clan::qdfrnt2(cycles[i], kernel, unit_pure_quaternion);
		cycles[i] = dfrnt_clan::qdfrnt2(cycles[i], kernel, unit_pure_quaternion);
	}

	tool::save_cube_to_image(output_path, tool::merge_blocks(outputs, blocks_length, 512 / 8));
	tool::save_cube_to_image(cycle_path, tool::merge_blocks(cycles, blocks_length, 512 / 8));
	tool::save_cube_to_image(restored_path, tool::merge_blocks(restoreds, blocks_length, 512 / 8));
}