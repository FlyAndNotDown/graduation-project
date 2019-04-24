#include <iostream>
#include <armadillo>
using namespace arma;
using namespace std;

class tool {
public:
	static void print_mat_data(mat matrix);
	static void print_cx_mat_data(cx_mat matrix);
};