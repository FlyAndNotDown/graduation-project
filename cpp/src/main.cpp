#include "define.h"

int main() {
	cx_mat matrix(5, 5, fill::zeros);
	auto output = dfrntKernel(matrix);

	return 0;
}