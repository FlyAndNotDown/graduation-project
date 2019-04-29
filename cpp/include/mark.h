#ifndef WATERMARK_MARK_H
#define WATERMARK_MARK_H

#include <armadillo>
#include <opencv2/opencv.hpp>
using namespace arma;
using namespace cv;

namespace watermark {
	class mark {
		public:
			static const int MARK_TYPE_QDFRNT = 0;
			static const int MARK_TYPE_QDFRFT = 1;

			double get_texture_mask(cv::Mat block, uword window_length);
			double get_color_mask(cv::Mat block, double color_factor);
			double get_edge_mask(cv::Mat block);
			vec get_adaptive_masks(cv::Mat source, uword window_length, double color_factor);

			void svm_mark(int type, cube source, mat secret, cube &output, mat &location_keys, int arnold_times, cx_mat kernel, cx_mat invser_kernel, uword intensity);
	};
};

#endif
