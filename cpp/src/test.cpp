#include "test.h"
#include "tool.h"
#include <armadillo>
using namespace arma;
using namespace watermark;

void test::tool_test_print_mat() {
    mat source(5, 5);
    uword rows = source.n_rows;
    uword cols = source.n_cols;
    for (uword i = 0; i < rows; i++) {
        for (uword j = 0; j < cols; j++) {
            source(i, j) = i * rows + j;
        }
    }

    tool::print_mat("source", source);
}