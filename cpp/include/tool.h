#ifndef WATERMARK_TOOL_H
#define WATERMARK_TOOL_H

#include <opencv2/opencv.hpp>
#include <armadillo>
using namespace arma;
using namespace cv;

namespace watermark {
    class tool {
        public:
            static void print_mat(char *name, mat matrix);
            static void print_cx_mat(char *name, cx_mat matrix);
			static void print_cube(char *name, cube matrix);
			static void print_cx_cube(char *name, cx_cube matrix);

            static cx_mat mat_to_cx_mat(mat matrix);
			static cx_cube cube_to_cx_cube(cube matrix);

			static mat read_image_to_mat(char *path);
			static cube read_image_to_cube(char *path);
			static void save_mat_to_image(char *path, mat source);
			static void save_cube_to_image(char *path, cube source);
			static cube cv_mat_to_cube(cv::Mat source);
			static cv::Mat cube_to_cv_mat(cube source);
    
			static uword get_blocks_length(cube source, uword length);
			static uword get_blocks_length(cv::Mat source, uword length);
			static void split_to_blocks(cube source, uword length, cube *output);
			static void split_to_blocks(cv::Mat source, uword length, cv::Mat *output);
			static cube merge_blocks(cube *blocks, uword size, uword block_per_row);

			static vec vectorize(mat source);
			static mat matrixize(vec source, uword num_per_row);

			static mat arnold(mat source, int order);

			static vec normalize(vec source);
	};
};

#endif