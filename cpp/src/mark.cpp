#include "mark.h"
#include "tool.h"
#include <armadillo>
using namespace arma;
using namespace watermark;

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
	// TODO
}