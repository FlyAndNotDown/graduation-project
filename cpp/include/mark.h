#ifndef WATERMARK_MARK_H
#define WATERMARK_MARK_H

#include <armadillo>
using namespace arma;

namespace watermark {
	class mark {
		public:
			static const int MARK_TYPE_QDFRNT = 0;
			static const int MARK_TYPE_QDFRFT = 1;
			void svm_mark(int type, cube source, mat secret, cube &output, mat &location_keys, int arnold_times, cx_mat kernel, cx_mat invser_kernel, uword intensity);
	};
};

#endif
