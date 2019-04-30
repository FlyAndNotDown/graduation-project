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

			static vec get_texture_masks(cv::Mat *blocks, uword length, int window_length);
			static vec get_color_masks(cv::Mat *blocks, uword length, double color_factor);
			static vec get_edge_masks(cv::Mat *blocks, uword length);
			static uvec get_adaptive_masks(cv::Mat source, uword window_length, double color_factor);

			static void im_mark(int type, cv::Mat source, cv::Mat secret, cv::Mat &output, umat &location_keys, int arnold_times, cx_mat kernel, cx_mat invser_kernel, uword intensity);
			static void im_train(int type, cv::Mat source, uvec secret, cx_mat kernel, uword intensity, char *model_file);
	};
};

#endif
