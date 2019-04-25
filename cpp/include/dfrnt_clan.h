#ifndef WATERMARK_DFRNT_CLAN_H
#define WATERMARK_DFRNT_CLAN_H

#include <armadillo>
using namespace arma;

namespace watermark {
    class dfrnt_clan {
        public:
            static cx_mat kernel(double order, double cycle, mat randomMatrix);
            static cx_vec dfrnt(cx_vec source, cx_mat kernel);
            static cx_mat dfrnt2(cx_mat source, unsigned int length, cx_mat kernel);
            static cx_mat lqdfrnt(cx_mat source, cx_mat kernel, vec unitPureQuaternion);
            static cx_cube lqdfrnt2(cx_cube source, unsigned int length, cx_mat kernel, vec unitPureQuaternion);
    };
};

#endif