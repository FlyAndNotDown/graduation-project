#include "mark.h"
#include "tool.h"
#include "dfrft_clan.h"
#include "dfrnt_clan.h"
#include "svm.h"
#include <armadillo>
using namespace arma;
using namespace watermark;

vec mark::get_texture_masks(cv::Mat *blocks, uword length, int window_length) {
	// init output
	vec output(length, fill::zeros);
	
	// for every block, get mask
	for (uword t = 0; t < length; t++) {
		// get size info
		uword rows = blocks[t].rows;
		uword cols = blocks[t].cols;

		// get window size
		int window_size = (2 * window_length + 1) * (2 * window_length + 1);

		// for every pixel, calculate texture mask and get sum
		double mask = 0;
		for (int i = 0; i < rows; i++) {
			for (int j = 0; j < cols; j++) {
				double sum_b = 0;
				double sum_g = 0;
				double sum_r = 0;

				// get near (2 * length) ^ 2 size pixels' value sum
				for (int m = i - window_length; m <= i + window_length; m++) {
					for (int n = j - window_length; n <= j + window_length; n++) {
						if (m >= 0 && m <= (rows - 1) && n >= 0 && n <= (cols - 1)) {
							Vec3b pixel_t = blocks[t].at<Vec3b>(m, n);
							sum_b += pixel_t[0] * 1.0 / 255;
							sum_g += pixel_t[1] * 1.0 / 255;
							sum_r += pixel_t[2] * 1.0 / 255;
						} /* else {
							Vec3b pixel_t = blocks[t].at<Vec3b>(i, j);
							sum_b += pixel_t[0] * 1.0 / 255;
							sum_g += pixel_t[1] * 1.0 / 255;
							sum_r += pixel_t[2] * 1.0 / 255;
						} */
					}
				}

				// get average
				double average_b = sum_b * 1.0 / window_size;
				double average_g = sum_g * 1.0 / window_size;
				double average_r = sum_r * 1.0 / window_size;

				// get texture mask value in three channel
				Vec3b pixel = blocks[t].at<Vec3b>(i, j);
				double mask_b = abs(pixel[0] * 1.0 / 255 - average_b);
				double mask_g = abs(pixel[1] * 1.0 / 255 - average_g);
				double mask_r = abs(pixel[2] * 1.0 / 255 - average_r);

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

				// TODO
				double channel_a = pixel[1] * 1.0 / 256;
				double channel_b = pixel[2] * 1.0 / 256;

				// get mask
				mask += 1 - exp(0 - (channel_a * channel_a + channel_b * channel_b) / (color_factor * color_factor));
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
		cv::Mat blurs[3];
		cv::Mat edges[3];
		for (uword i = 0; i < 3; i++) {
			// blur(channels[i], blurs[i], Size(9, 9));
			// Canny(blurs[i], edges[i], 3, 9);
			Sobel(channels[i], edges[i], CV_8U, 1, 1, 3, 1, 1);
		}

		// get sum
		double mask = 0;
		for (uword i = 0; i < rows; i++) {
			for (uword j = 0; j < cols; j++) {
				mask += (unsigned int) edges[0].at<uchar>(i, j) * 1.0 / 255;
				mask += (unsigned int) edges[1].at<uchar>(i, j) * 1.0 / 255;
				mask += (unsigned int) edges[2].at<uchar>(i, j) * 1.0 / 255;
			}
		}

		// add mask to result vector
		output(t) = mask;
	}

	// return result
	return output;
}

uvec mark::get_adaptive_masks(cv::Mat source, uword window_length, double color_factor) {
	// do split
	uword blocks_length = tool::get_blocks_length(source, 8);
	cv::Mat *blocks = new cv::Mat[blocks_length];
	tool::split_to_blocks(source, 8, blocks);

	// get three mask vector and do normalize
	vec texture_masks = tool::normalize(get_texture_masks(blocks, blocks_length, window_length));
	vec color_masks = tool::normalize(get_color_masks(blocks, blocks_length, color_factor));
	vec edge_masks = tool::normalize(get_edge_masks(blocks, blocks_length));

	// clear mem
	delete[] blocks;

	// get adaptive and do normalize
	vec temp_masks = tool::normalize(0.2 * texture_masks + 0.5 * (1 - edge_masks) + 0.3 * (1 - color_masks));

	// split it to 6 order
	uvec masks(blocks_length, fill::zeros);
	for (uword i = 0; i < blocks_length; i++) {
		masks(i) = (uword) floor(temp_masks(i) * 6);
	}

	// return result
	return masks;
}

void mark::im_mark(int type, cv::Mat source, cv::Mat secret, cv::Mat &output, umat &location_keys, int arnold_times, cx_mat kernel, cx_mat inverse_kernel, uword intensity) {
	// normalize the intensity
	double intensity_d = intensity * 1.0 / 255;

	// get size info
	uword source_rows = source.rows;
	uword source_cols = source.cols;

	// do arnold transform to secret
	mat secret_b = tool::cv_mat_to_bmat(secret);
	mat secret_arnold = tool::arnold(secret_b, arnold_times);

	// get binary secret sequence
	vec secret_sequence = tool::vectorize(secret_arnold);
	uword secret_sequence_length = secret_sequence.n_rows;

	// init location keys
	location_keys.zeros(4, secret_sequence_length);
	uword location_keys_count = 0;

	// splice picture to smaller blocks
	uword blocks_length = tool::get_blocks_length(source, 8);
	cube *blocks = new cube[blocks_length];
	tool::split_to_blocks(tool::cv_mat_to_cube(source), 8, blocks);

	// set the unit quaternion
	vec u(4, fill::zeros);
	u(1) = 1;

	// get adaptive factors of every blocks
	uvec masks = mark::get_adaptive_masks(source, 1, 0.25);

	// do transform to every block
	cube *encoded_blocks = new cube[blocks_length];
	switch (type) {
		case mark::MARK_TYPE_QDFRFT:
			for (uword i = 0; i < blocks_length; i++) {
				encoded_blocks[i] = dfrft_clan::qdfrft2(blocks[i], kernel, u);
				// tool::print_cube("encoded_blocks", encoded_blocks[i]);
			}
			break;
		case mark::MARK_TYPE_QDFRNT:
			for (uword i = 0; i < blocks_length; i++) {
				encoded_blocks[i] = dfrnt_clan::qdfrnt2(blocks[i], kernel, u);
			}
		default:
			break;
	}

	// start watermakring
	uword x = 0;
	bool over = false;
	for (uword channel = 2; channel <= 3; channel++) {
		// if over, break
		if (over) {
			break;
		}

		// mark 1 point in single block
		for (uword n = 0; n < blocks_length; n++) {
			// if secret sequence have used up, break
			if (x >= secret_sequence_length) {
				over = true;
				break;
			}

			// if adaptive factor is zero, do not watermark
			if (masks(n) <= 1) {
				continue;
			}

			// get channel
			mat block_channel = encoded_blocks[n].slice(channel);

			// get location & location key-value sequence
			mat block_channel_sequence(3, 64);
			for (uword i = 0; i < 8; i++) {
				for (uword j = 0; j < 8; j++) {
					uword index_t = i * 8 + j;
					block_channel_sequence(0, index_t) = abs(block_channel(i, j));
					block_channel_sequence(1, index_t) = i;
					block_channel_sequence(2, index_t) = j;
				}
			}

			// sorting sequence by value
			for (uword i = 0; i < 63; i++) {
				uword min_index = i;
				for (uword j = i + 1; j < 64; j++) {
					if (block_channel_sequence(0, j) < block_channel_sequence(0, min_index)) {
						min_index = j;
					}
				}
				vec t = block_channel_sequence.col(i);
				block_channel_sequence.col(i) = block_channel_sequence.col(min_index);
				block_channel_sequence.col(min_index) = t;
			}

			// tool::print_mat("block_channel", block_channel);

			// get middle sequence value's position
			uword t = 31;
			uword row = (uword) block_channel_sequence(1, t);
			uword col = (uword) block_channel_sequence(2, t);
			uword count = 1;
			bool flag = true;
			while (!(row >= 1 && row <= 6 && col >= 1 && col <= 6)) {
				if (flag) {
					t += count;
				} else {
					t -= count;
				}
				count++;
				flag = !flag;
				row = (uword) block_channel_sequence(1, t);
				col = (uword) block_channel_sequence(2, t);
			}

			// save mark location
			location_keys(0, location_keys_count) = n;
			location_keys(1, location_keys_count) = channel;
			location_keys(2, location_keys_count) = row;
			location_keys(3, location_keys_count) = col;
			location_keys_count++;

			// get average
			double average = 0;
			for (int i = -1; i <= 1; i++) {
				for (int j = -1; j <= 1; j++) {
					if (type == mark::MARK_TYPE_QDFRFT && abs(block_channel(row + i, col + j)) > 3 * abs(block_channel(row, col))) {
						average += block_channel(row, col);
					} else {
						average += block_channel(row + i, col + j);
					}
				}
			}
			average -= block_channel(row, col);
			average = average * 1.0 / 8;

			// do watermark
			/* if (abs((2 * secret_sequence(x) - 1) * masks(n) * intensity_d) > 0.1) {
				cout << (2 * secret_sequence(x) - 1) * masks(n) * intensity_d << endl;
			} */
			// cout << "before: " << encoded_blocks[n](row, col, channel) << " average: " << average << " add: " << (2 * secret_sequence(x) - 1) * masks(n) * intensity_d << " ";
			encoded_blocks[n](row, col, channel) = average + (2 * secret_sequence(x) - 1) * masks(n) * intensity_d;
			// cout << "after: " << encoded_blocks[n](row, col, channel) << endl;
			x++;
		}
	}

	// do inverse transform to every encoded block
	cube *restored_blocks = new cube[blocks_length];
	switch (type) {
		case mark::MARK_TYPE_QDFRFT:
			for (uword i = 0; i < blocks_length; i++) {
				restored_blocks[i] = tool::fix_after_transform(dfrft_clan::qdfrft2(encoded_blocks[i], inverse_kernel, u));
			}
			break;
		case mark::MARK_TYPE_QDFRNT:
			for (uword i = 0; i < blocks_length; i++) {
				restored_blocks[i] = tool::fix_after_transform(dfrnt_clan::qdfrnt2(encoded_blocks[i], inverse_kernel, u));
			}
		default:
			break;
	}

	// merge
	cube output_t = tool::merge_blocks(restored_blocks, blocks_length, source_rows / 8);
	output = tool::cube_to_cv_mat(output_t);

	// free blocks mem
	delete[] blocks;
	delete[] encoded_blocks;
	delete[] restored_blocks;
}

void mark::im_train(int type, cv::Mat source, uvec secret, cx_mat kernel, uword intensity, char *model_file) {
	// normalize the intensity
	double intensity_d = intensity * 1.0 / 255;

	// get size info
	uword source_rows = source.rows;
	uword source_cols = source.cols;
	uword secret_length = secret.n_rows;

	// init train data set
	svm_problem train_data_set;
	train_data_set.l = secret_length;
	train_data_set.y = new double[secret_length];
	train_data_set.x = new svm_node*[secret_length];
	int train_data_count = 0;

	// get binary secret sequence
	uvec secret_sequence = secret;
	uword secret_sequence_length = secret_sequence.n_rows;

	// splice picture to smaller blocks
	uword blocks_length = tool::get_blocks_length(source, 8);
	cube *blocks = new cube[blocks_length];
	tool::split_to_blocks(tool::cv_mat_to_cube(source), 8, blocks);

	// set the unit quaternion
	vec u(4, fill::zeros);
	u(1) = 1;

	// get adaptive factors of every blocks
	uvec masks = mark::get_adaptive_masks(source, 1, 0.25);

	// do transform to every block
	cube *encoded_blocks = new cube[blocks_length];
	switch (type) {
	case mark::MARK_TYPE_QDFRFT:
		for (uword i = 0; i < blocks_length; i++) {
			encoded_blocks[i] = dfrft_clan::qdfrft2(blocks[i], kernel, u);
			// tool::print_cube("encoded_blocks", encoded_blocks[i]);
		}
		break;
	case mark::MARK_TYPE_QDFRNT:
		for (uword i = 0; i < blocks_length; i++) {
			encoded_blocks[i] = dfrnt_clan::qdfrnt2(blocks[i], kernel, u);
		}
	default:
		break;
	}

	// start watermakring
	uword x = 0;
	bool over = false;
	for (uword channel = 2; channel <= 3; channel++) {
		// if over, break
		if (over) {
			break;
		}

		// mark 1 point in single block
		for (uword n = 0; n < blocks_length; n++) {
			// if secret sequence have used up, break
			if (x >= secret_sequence_length) {
				over = true;
				break;
			}

			// if adaptive factor is zero, do not watermark
			if (masks(n) <= 1) {
				continue;
			}

			// get channel
			mat block_channel = encoded_blocks[n].slice(channel);

			// get location & location key-value sequence
			mat block_channel_sequence(3, 64);
			for (uword i = 0; i < 8; i++) {
				for (uword j = 0; j < 8; j++) {
					uword index_t = i * 8 + j;
					block_channel_sequence(0, index_t) = abs(block_channel(i, j));
					block_channel_sequence(1, index_t) = i;
					block_channel_sequence(2, index_t) = j;
				}
			}

			// sorting sequence by value
			for (uword i = 0; i < 63; i++) {
				uword min_index = i;
				for (uword j = i + 1; j < 64; j++) {
					if (block_channel_sequence(0, j) < block_channel_sequence(0, min_index)) {
						min_index = j;
					}
				}
				vec t = block_channel_sequence.col(i);
				block_channel_sequence.col(i) = block_channel_sequence.col(min_index);
				block_channel_sequence.col(min_index) = t;
			}

			// tool::print_mat("block_channel", block_channel);

			// get middle sequence value's position
			uword t = 31;
			uword row = (uword)block_channel_sequence(1, t);
			uword col = (uword)block_channel_sequence(2, t);
			uword count = 1;
			bool flag = true;
			while (!(row >= 1 && row <= 6 && col >= 1 && col <= 6)) {
				if (flag) {
					t += count;
				}
				else {
					t -= count;
				}
				count++;
				flag = !flag;
				row = (uword)block_channel_sequence(1, t);
				col = (uword)block_channel_sequence(2, t);
			}

			cout << "train: " << "block_index: " << n << "channel: " << channel << "row: " << row << "col: " << col << endl;

			// get train data
			train_data_set.x[train_data_count] = new svm_node[10];
			train_data_set.x[train_data_count][9].index = -1;
			double increment = (double) (2 * (int) secret_sequence(x) - 1) * masks(n) * intensity_d;
			double average = 0;
			for (int i = -1; i <= 1; i++) {
				for (int j = -1; j <= 1; j++) {
					if (type == mark::MARK_TYPE_QDFRFT && abs(block_channel(row + i, col + j)) > 3 * abs(block_channel(row, col))) {
						average += block_channel(row, col);
					} else {
						average += block_channel(row + i, col + j);
					}
				}
			}
			average = (average - block_channel(row, col)) * 1.0 / 8;
			double value_on_mark_position = average + increment;
			for (int i = -1; i <= 1; i++) {
				for (int j = -1; j <= 1; j++) {
					int index = (i + 1) * 3 + (j + 1);
					train_data_set.x[train_data_count][index].index = index + 1;
					if (i == 0 && j == 0) {
						train_data_set.x[train_data_count][index].value = increment;
					} else {
						train_data_set.x[train_data_count][index].value = value_on_mark_position - block_channel(row + i, col + j);
					}
				}
			}

			/* if (train_data_count == 0) {
				for (int i = 0; i < 9; i++) {
					cout << train_data_set.x[train_data_count][i].value << " ";
				}
				cout << endl;
			} */

			train_data_set.y[train_data_count] = secret_sequence(x) == 0 ? -1 : 1;
			train_data_count++;
			x++;
		}
	}

	// start train
	svm_parameter param;
	// param.svm_type = C_SVC;
	param.svm_type = ONE_CLASS;
	// param.kernel_type = RBF;
	param.kernel_type = LINEAR;
	param.degree = 3;
	// param.gamma = 1;	// 1/num_features
	param.gamma = 1.0 / 9;
	param.coef0 = 0;
	param.nu = 0.5;
	param.cache_size = 1000;
	param.C = 1;
	// param.eps = 1e-3;
	param.eps = 1e-3;
	param.p = 0.1;
	param.shrinking = 1;
	param.probability = 0;
	param.nr_weight = 0;
	param.weight_label = NULL;
	param.weight = NULL;
	svm_model *model = svm_train(&train_data_set, &param);
	svm_save_model(model_file, model);

	// free blocks mem
	delete[] blocks;
	delete[] encoded_blocks;
	for (int i = 0; i < secret_length; i++) {
		delete[] train_data_set.x[i];
	}
	delete train_data_set.x;
	delete train_data_set.y;
	delete model;
}

void mark::im_restored(int type, cv::Mat source, cv::Mat &secret, int arnold_times, cx_mat kernel, umat location_keys, char *model_file) {
	// load model
	svm_model *model = svm_load_model(model_file);
	
	// get size info
	uword source_rows = source.rows;
	uword source_cols = source.cols;
	uword location_keys_cols = location_keys.n_cols;

	// get binary secret sequence
	vec secret_sequence(location_keys_cols, fill::zeros);

	// splice picture to smaller blocks
	uword blocks_length = tool::get_blocks_length(source, 8);
	cube *blocks = new cube[blocks_length];
	tool::split_to_blocks(tool::cv_mat_to_cube(source), 8, blocks);

	// set the unit quaternion
	vec u(4, fill::zeros);
	u(1) = 1;

	// do transform to every block
	cube *encoded_blocks = new cube[blocks_length];
	switch (type) {
		case mark::MARK_TYPE_QDFRFT:
			for (uword i = 0; i < blocks_length; i++) {
				encoded_blocks[i] = dfrft_clan::qdfrft2(blocks[i], kernel, u);
				// tool::print_cube("encoded_blocks", encoded_blocks[i]);
			}
			break;
		case mark::MARK_TYPE_QDFRNT:
			for (uword i = 0; i < blocks_length; i++) {
				encoded_blocks[i] = dfrnt_clan::qdfrnt2(blocks[i], kernel, u);
			}
		default:
			break;
	}

	// for every position, get secret value
	for (uword n = 0; n < location_keys_cols; n++) {
		// get info
		uword block_index = location_keys(0, n);
		uword channel = location_keys(1, n);
		uword row = location_keys(2, n);
		uword col = location_keys(3, n);

		cout << "restore" << "block_index: " << block_index << "channel: " << channel << "row: " << row << "col: " << col << endl;

		// calculate svm input data
		mat block_channel = encoded_blocks[block_index].slice(channel);
		svm_node *nodes = new svm_node[10];
		nodes[9].index = -1;
		double average = 0;
		for (int i = -1; i <= 1; i++) {
			for (int j = -1; j <= 1; j++) {
				if (type == mark::MARK_TYPE_QDFRFT && abs(block_channel(row + i, col + j)) > 3 * abs(block_channel(row, col))) {
					average += block_channel(row, col);
				} else {
					average += block_channel(row + i, col + j);
				}
			}
		}
		average = (average - block_channel(row, col)) * 1.0 / 8;
		for (int i = -1; i <= 1; i++) {
			for (int j = -1; j <= 1; j++) {
				int index = (i + 1) * 3 + (j + 1);
				nodes[index].index = index + 1;
				if (i == 0 && j == 0) {
					nodes[index].value = block_channel(row, col) - average;
				} else {
					nodes[index].value = block_channel(row, col) - block_channel(row + i, col + j);
				}
			}
		}

		/* if (n == 0) {
			for (int i = 0; i < 9; i++) {
				cout << nodes[i].value << " " << endl;
			}
			cout << endl;
		} */

		// predict result
		double predict_result = svm_predict(model, nodes);
		double distance_to_nega_one = abs(predict_result + 1);
		double distance_to_one = abs(predict_result - 1);
		if (distance_to_nega_one > distance_to_one) {
			secret_sequence(n) = 1;
		} else {
			secret_sequence(n) = 0;
		}
		delete[] nodes;
	}

	// change secret sequence to matrix
	uword secret_sequence_length = secret_sequence.n_rows;
	secret = tool::mat_to_cv_mat(tool::arnold(tool::matrixize(secret_sequence, floor(sqrt(secret_sequence_length))), 0 - arnold_times));

	// free blocks mem
	delete[] blocks;
	delete[] encoded_blocks;
	delete model;
}