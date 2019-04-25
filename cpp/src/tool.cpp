#include "tool.h"
using namespace watermark;
using namespace std;

void tool::print_mat(char *name, mat matrix) {
    uword rows = matrix.n_rows;
    uword cols = matrix.n_cols;

    cout << name << ":" << endl;
    for (uword i = 0; i < rows; i++) {
        for (uword j = 0; j < cols; j++) {
            cout << matrix.at(i, j) << "\t";
        }
        cout << endl;
    }
    cout << endl;
}