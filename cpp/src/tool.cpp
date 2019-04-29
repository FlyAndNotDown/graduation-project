#include "tool.h"
#include <iostream>
#include <opencv2/opencv.hpp>
using namespace watermark;
using namespace std;
using namespace cv;

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

cx_cube tool::cube_to_cx_cube(cube matrix) {
	cube imag_cube(matrix.n_rows, matrix.n_cols, matrix.n_slices, fill::zeros);
	cx_cube output(matrix, imag_cube);
	return output;
}

mat tool::read_image_to_mat(char *path) {
	cv::Mat image = imread(path, IMREAD_GRAYSCALE);
	uword rows = image.rows;
	uword cols = image.cols;
	mat output(rows, cols, fill::zeros);
	for (uword i = 0; i < rows; i++) {
		for (uword j = 0; j < cols; j++) {
			output(i, j) = image.at<uchar>(i, j) * 1.0 / 255;
		}
	}
	return output;
}

void tool::save_mat_to_image(char *path, mat source) {
	uword rows = source.n_rows;
	uword cols = source.n_cols;
	cv::Mat image(rows, cols, CV_8U);
	for (uword i = 0; i < rows; i++) {
		for (uword j = 0; j < cols; j++) {
			image.at<uchar>(i, j) = (uchar) (source.at(i, j) * 255);
		}
	}

	imwrite(path, image);
}

cube tool::read_image_to_cube(char *path) {
	cv::Mat image = imread(path, IMREAD_COLOR);
	uword rows = image.rows;
	uword cols = image.cols;
	cube output(rows, cols, 4, fill::zeros);
	for (uword i = 0; i < rows; i++) {
		for (uword j = 0; j < cols; j++) {
			Vec3b pixel = image.at<Vec3b>(i, j);
			output(i, j, 1) = pixel[0] * 1.0 / 255;
			output(i, j, 2) = pixel[1] * 1.0 / 255;
			output(i, j, 3) = pixel[2] * 1.0 / 255;
		}
	}
	return output;
}

void tool::save_cube_to_image(char *path, cube source) {
	uword rows = source.n_rows;
	uword cols = source.n_cols;
	cv::Mat image(rows, cols, CV_8UC3);
	for (uword i = 0; i < rows; i++) {
		for (uword j = 0; j < cols; j++) {
			Vec3b pixel(
				(uchar) (source(i, j, 1) * 255),
				(uchar) (source(i, j, 2) * 255),
				(uchar) (source(i, j, 3) * 255)
			);
			image.at<Vec3b>(i, j) = pixel;
		}
	}

	imwrite(path, image);
}

uword tool::get_blocks_length(cube source, uword length) {
	// get source size info
	uword source_rows = source.n_rows;
	uword source_cols = source.n_cols;
	
	// calculate smaller block nums
	uword block_num_per_row = source_cols / length;
	uword block_num_per_col = source_rows / length;

	// return size
	return block_num_per_row * block_num_per_col;
}

uword tool::get_blocks_length(cv::Mat source, uword length) {
	// get source size info
	uword source_rows = source.rows;
	uword source_cols = source.cols;

	// calculate smaller block nums
	uword block_num_per_row = source_cols / length;
	uword block_num_per_col = source_rows / length;

	// return size
	return block_num_per_row * block_num_per_col;
}

void tool::split_to_blocks(cube source, uword length, cube *output) {
	// get source size info
	uword source_rows = source.n_rows;
	uword source_cols = source.n_cols;
	uword source_channels = source.n_slices;

	// calculate smaller block nums
	uword block_num_per_row = source_cols / length;
	uword block_num_per_col = source_rows / length;

	// get output array size
	uword size = block_num_per_row * block_num_per_col;

	// init
	for (uword i = 0; i < size; i++) {
		output[i].zeros(length, length, source_channels);
	}

	// do the copy
	for (uword i = 0; i < block_num_per_col; i++) {
		for (uword j = 0; j < block_num_per_row; j++) {
			for (uword m = 0; m < length; m++) {
				for (uword n = 0; n < length; n++) {
					for (uword v = 0; v < source_channels; v++) {
						output[i * block_num_per_row + j](m, n, v) = source(i * length + m, j * length + n, v);
					}
				}
			}
		}
	}
}

void tool::split_to_blocks(cv::Mat source, uword length, cv::Mat *output) {
	// get source size info
	int rows = source.rows;
	int cols = source.cols;

	// calculate smaller block nums
	uword block_num_per_row = cols / length;
	uword block_num_per_col = rows / length;

	// get output array size
	uword size = block_num_per_row * block_num_per_col;

	// init
	for (uword i = 0; i < size; i++) {
		output[i].create(rows, cols, CV_8UC3);
	}

	// do the copy
	for (uword i = 0; i < block_num_per_col; i++) {
		for (uword j = 0; j < block_num_per_row; j++) {
			for (uword m = 0; m < length; m++) {
				for (uword n = 0; n < length; n++) {
					Vec3b pixel = source.at<Vec3b>(i * length + m, j * length + n);
					Vec3b temp(pixel[0], pixel[1], pixel[2]);
					output[i * block_num_per_row + j].at<Vec3b>(m, n) = temp;
				}
			}
		}
	}
}

cube tool::merge_blocks(cube *blocks, uword size, uword block_per_row) {
	// get size info
	uword block_rows = blocks[0].n_rows;
	uword block_cols = blocks[0].n_cols;
	uword block_channels = blocks[0].n_slices;

	// get matrix size
	uword block_per_col = size / block_per_row;
	uword matrix_rows = block_rows * block_per_col;
	uword matrix_cols = block_cols * block_per_row;

	// init output
	cube output(matrix_rows, matrix_cols, block_channels, fill::zeros);

	// do copy
	for (uword i = 0; i < size; i++) {
		for (uword m = 0; m < block_rows; m++) {
			for (uword n = 0; n < block_cols; n++) {
				uword row = i / block_per_row;
				uword col = i % block_per_row;
				for (uword v = 0; v < block_channels; v++) {
					output(row * block_rows + m, col * block_cols + n, v) = blocks[i](m, n, v);
				}
			}
		}
	}

	// return result
	return output;
}

vec tool::vectorize(mat source) {
	// get size info
	uword source_rows = source.n_rows;
	uword source_cols = source.n_cols;

	// init output vector
	vec output(source_rows * source_cols, fill::zeros);

	// copy
	for (uword i = 0; i < source_rows; i++) {
		for (uword j = 0; j < source_cols; j++) {
			output(i * source_cols + j) = source(i, j);
		}
	}

	// return output
	return output;
}

mat tool::matrixize(vec source, uword num_per_row) {
	// get size info
	uword length = source.n_rows;
	uword num_per_col = length / num_per_row;

	// init output matrix
	mat output(num_per_col, num_per_row, fill::zeros);
	for (uword i = 0; i < num_per_col; i++) {
		for (uword j = 0; j < num_per_row; j++) {
			output(i, j) = source(i * num_per_row + j);
		}
	}
	
	// return result
	return output;
}

mat tool::arnold(mat source, int order) {
	// get size info
	uword rows = source.n_rows;
	uword cols = source.n_cols;
	if (rows != cols) {
		mat return_temp(rows, rows, fill::zeros);
		return return_temp;
	}

	// init output
	mat output(rows, rows, fill::zeros);
	mat temp = source;
	if (order >= 0) {
		for (int n = 0; n < order; n++) {
			for (uword i = 0; i < rows; i++) {
				for (uword j = 0; j < cols; j++) {
					uword x = (i + j) % rows;
					uword y = (i + 2 * j) % rows;
					output(y, x) = temp(j, i);
				}
			}
			temp = output;
		}
		return output;
	} else {
		order = 0 - order;
		for (int n = 0; n < order; n++) {
			for (uword i = 0; i < rows; i++) {
				for (uword j = 0; j < cols; j++) {
					uword x = (2 * i - j) % rows;
					uword y = (j - i) % rows;
					output(y, x) = temp(j, i);
				}
			}
			temp = output;
		}
		return output;
	}
}

vec tool::normalize(vec source) {
	// get length
	uword length = source.n_rows;

	// get max & min value of vector
	double max_value = source(0);
	double min_value = source(0);
	for (uword i = 0; i < length; i++) {
		if (source(i) > max_value) {
			max_value = source(i);
		}
		if (source(i) < min_value) {
			min_value = source(i);
		}
	}

	// init output
	vec output(length, fill::zeros);
	
	// do normalize
	double step = max_value - min_value;
	for (uword i = 0; i < length; i++) {
		output(i) = (source(i) - min_value) * 1.0 / step;
	}

	// return result
	return output;
}