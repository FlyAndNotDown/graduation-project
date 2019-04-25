#ifndef WATERMARK_TOOL_H
#define WATERMARK_TOOL_H

#include <armadillo>
using namespace std;
using namespace arma;

namespace watermark {
    class tool {
        public:
            static void print_mat(mat matrix);
            static void print_cx_mat(cx_mat matrix);
    };
};

#endif