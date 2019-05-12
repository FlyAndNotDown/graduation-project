#ifndef WATERMARK_TOOL_H
#define WATERMARK_TOOL_H

#include <opencv2/opencv.hpp>
#include <armadillo>
using namespace arma;
using namespace cv;

namespace watermark {
    class tool {
        public:
            static void print_mat(const char *name, mat matrix);
            static void print_cx_mat(const char *name, cx_mat matrix);
			static void print_cube(const char *name, cube matrix);
			static void print_cx_cube(const char *name, cx_cube matrix);
			static void print_umat(const char *name, umat matrix);

            static cx_mat mat_to_cx_mat(mat matrix);
			static cx_cube cube_to_cx_cube(cube matrix);
			static cube cv_mat_to_cube(cv::Mat source);
			static cv::Mat cube_to_cv_mat(cube source);
			static mat cv_mat_to_bmat(cv::Mat source);
			static cv::Mat mat_to_cv_mat(mat source);

			static mat read_image_to_mat(const char *path);
			static cube read_image_to_cube(const char *path);
			static void save_mat_to_image(const char *path, mat source);
			static void save_cube_to_image(const char *path, cube source);
			static void save_matrix_to_file(mat source, const char *file_path);
			static mat read_matrix_from_file(const char *file_path);
			static void save_u_matrix_to_file(umat source, const char *file_path);
			static umat read_u_matrix_from_file(const char *file_path);
    
			static uword get_blocks_length(cube source, uword length);
			static uword get_blocks_length(cv::Mat source, uword length);
			static void split_to_blocks(cube source, uword length, cube *output);
			static void split_to_blocks(cv::Mat source, uword length, cv::Mat *output);
			static cube merge_blocks(cube *blocks, uword size, uword block_per_row);
			static vec vectorize(mat source);
			static mat matrixize(vec source, uword num_per_row);

			static mat arnold(mat source, int order);

			static mat normalize(mat source);
			static mat normalize_by_max(mat source);
			static cube fix_after_transform(cube source);
			static uvec get_random_secret_sequence(uword rows, uword cols);
	};
};

#endif