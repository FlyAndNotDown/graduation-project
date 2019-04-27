#ifndef WATERMARK_DFRFT_CLAN_H
#define WATERMARK_DFRFT_CLAN_H

#include <armadillo>
using namespace arma;

namespace watermark {
	class dfrft_clan {
		public:
			static cx_mat kernel(uword length, double order);
			static cx_mat dfrft(cx_mat source, cx_mat kernel);
			static cx_mat dfrft2(cx_mat source, cx_mat kernel);
			static cube qdfrft(cube source, cx_mat kernel, vec unit_pure_quaternion);
			static cube qdfrft2(cube source, cx_mat kernel, vec unit_pure_quaternion);
	};
};

#endif
