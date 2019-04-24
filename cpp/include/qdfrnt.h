#include "define.h"
#include <armadillo>
using namespace std;
using namespace arma;

class qdfrnt {
public:
	static cx_mat kernel(double order, double cycle, mat randomMatrix);
	static cx_vec dfrnt(cx_vec vector, cx_mat kernel);
};