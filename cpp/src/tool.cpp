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