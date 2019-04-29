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

			vec get_texture_masks(cv::Mat *blocks, uword length, uword window_length);
			vec get_color_masks(cv::Mat *blocks, uword length, double color_factor);
			vec get_edge_masks(cv::Mat *blocks, uword length);
			uvec get_adaptive_masks(cv::Mat source, uword window_length, double color_factor);

			void svm_mark(int type, cv::Mat source, cv::Mat secret, cv::Mat &output, umat &location_keys, int arnold_times, cx_mat kernel, cx_mat invser_kernel, uword intensity);
	};
};

#endif
