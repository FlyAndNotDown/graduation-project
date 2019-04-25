#ifndef WATERMARK_TOOL_H
#define WATERMARK_TOOL_H

#include <armadillo>
using namespace std;
using namespace arma;

namespace watermark {
    class tool {
        public:
            static void print_mat(char *name, mat matrix);
            static void print_cx_mat(char *name, cx_mat matrix);
            static cx_mat mat_to_cx_mat(mat matrix);
    };
};

#endif