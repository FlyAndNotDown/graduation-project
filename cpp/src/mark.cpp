#include "mark.h"
#include "tool.h"
#include <armadillo>
using namespace arma;
using namespace watermark;

vec mark::get_texture_masks(cv::Mat *blocks, uword length, uword window_length) {
	// init output
	vec output(length, fill::zeros);
	
	// for every block, get mask
	for (uword t = 0; t < length; t++) {
		// get size info
		uword rows = blocks[t].rows;
		uword cols = blocks[t].cols;

		// get window size
		uword window_size = (2 * window_length + 1) * (2 * window_length + 1);

		// for every pixel, calculate texture mask and get sum
		double mask = 0;
		for (uword i = 0; i < rows; i++) {
			for (uword j = 0; j < cols; j++) {
				double sum_b = 0;
				double sum_g = 0;
				double sum_r = 0;

				// get near (2 * length) ^ 2 size pixels' mask sum
				for (uword m = i - window_length; m <= i + window_length; m++) {
					for (uword n = i - window_length; n <= i + window_length; n++) {
						if (m >= 0 && m <= (rows - 1) && n >= 0 && n <= (cols - 1)) {
							Vec3b pixel_t = blocks[t].at<Vec3b>(m, n);
							sum_b += pixel_t[0];
							sum_g += pixel_t[1];
							sum_r += pixel_t[2];
						}
					}
				}

				// get average
				double average_b = sum_b / window_size;
				double average_g = sum_g / window_size;
				double average_r = sum_r / window_size;

				// get texture mask value in three channel
				Vec3b pixel = blocks[t].at<Vec3b>(i, j);
				double mask_b = abs(pixel[0] - average_b);
				double mask_g = abs(pixel[1] - average_g);
				double mask_r = abs(pixel[2] - average_r);

				// get mask and add it to result
				double max = mask_b;
				if (mask_g > max) {
					max = mask_g;
				}
				if (mask_r > max) {
					max = mask_r;
				}
				mask += max;
			}
		}

		// add result to output vector
		output(t) = mask;
	}

	// return output vector
	return output;
}

vec mark::get_color_masks(cv::Mat *blocks, uword length, double color_factor) {
	// init output
	vec output(length, fill::zeros);

	// for every blocks, get its color mask
	for (uword t = 0; t < length; t++) {
		// get size info
		uword rows = blocks[t].rows;
		uword cols = blocks[t].cols;

		// convert color space to CIELab
		cv::Mat lab;
		cvtColor(blocks[t], lab, COLOR_RGB2Lab);

		// for every pixel, calculate its color mask value and get sum
		double mask = 0;
		for (uword i = 0; i < rows; i++) {
			for (uword j = 0; j < cols; j++) {
				// do normalize
				Vec3b pixel = lab.at<Vec3b>(i, j);
				double channel_a = pixel[1] * 1.0 / 255;
				double channel_b = pixel[2] * 1.0 / 255;

				// get mask
				mask += 1 - exp(0 - channel_a * channel_a - channel_b * channel_b) / (color_factor * color_factor);
			}
		}

		// add mask to output vector
		output(t) = mask;
	}

	// return result
	return output;
}

vec mark::get_edge_masks(cv::Mat *blocks, uword length) {
	// init output
	vec output(length, fill::zeros);

	// for every blocks, get its edge mask
	for (uword t = 0; t < length; t++) {
		// get size info
		uword rows = blocks[t].rows;
		uword cols = blocks[t].cols;

		// get three channels
		cv::Mat channels[3];
		cv::split(blocks[t], channels);

		// get canny edge of three channels
		cv::Mat blurs[3], edges[3];
		for (uword i = 0; i < 3; i++) {
			blur(channels[i], blurs[i], Size(9, 9));
			Canny(blurs[i], edges[i], 3, 9);
		}

		// get sum
		double mask = 0;
		for (uword i = 0; i < rows; i++) {
			for (uword j = 0; j < cols; j++) {
				mask += edges[0].at<uint>(i, j) * 1.0 / 255;
				mask += edges[1].at<uint>(i, j) * 1.0 / 255;
				mask += edges[2].at<uint>(i, j) * 1.0 / 255;
			}
		}

		// add mask to result vector
		output(t) = mask;
	}

	// return result
	return output;
}

vec mark::get_adaptive_masks(cv::Mat source, uword window_length, double color_factor) {
	// do split
	uword blocks_length = tool::get_blocks_length(source, 8);
	cv::Mat *blocks = new cv::Mat[blocks_length];

	// get three mask vector and do normalize
	vec texture_masks = tool::normalize(get_texture_masks(blocks, blocks_length, window_length));
	vec color_masks = tool::normalize(get_color_masks(blocks, blocks_length, color_factor));
	vec edge_masks = tool::normalize(get_edge_masks(blocks, blocks_length));

	// clear mem
	delete[] blocks;

	// get adaptive and do normalize
	vec temp_masks = tool::normalize(0.2 * texture_masks + 0.5 * (1 - edge_masks) + 0.3 * (1 - color_masks));

	// split it to 6 order
	vec masks(blocks_length, fill::zeros);
	for (uword i = 0; i < blocks_length; i++) {
		masks(i) = floor(temp_masks(i) * 6);
	}
	
	// return result
	return masks;
}

void mark::svm_mark(int type, cube source, mat secret, cube &output, mat &location_keys, int arnold_times, cx_mat kernel, cx_mat invser_kernel, uword intensity) {
	// normalize the intensity
	double intensity_d = intensity * 1.0 / 255;

	// get size info
	uword source_rows = source.n_rows;
	uword source_cols = source.n_cols;
	uword source_channels = source.n_slices;

	// do arnold transform to secret
	mat secret_arnold = tool::arnold(secret, arnold_times);

	// get binary secret sequence
	vec secret_sequence = tool::vectorize(secret_arnold);
	uword secret_sequence_length = secret_sequence.n_rows;

	// init location keys
	location_keys.zeros(4, secret_sequence_length);

	// splice picture to smaller blocks
	uword blocks_length = tool::get_blocks_length(source, 8);
	cube *blocks = new cube[blocks_length];
	tool::split_to_blocks(source, 8, blocks);

	// set the unit quaternion
	vec u(4, fill::zeros);
	u(1) = 1;

	// get adaptive factors of every blocks
	// TODO delete blocks mem
}