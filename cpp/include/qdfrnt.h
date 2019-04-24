#include "define.h"
#include <armadillo>
using namespace std;
using namespace arma;

class QDFRNT {
public:
	static cx_mat dfrntKernel(double order, double cycle, mat randomMatrix);
};