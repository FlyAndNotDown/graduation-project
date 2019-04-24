#include "define.h"

int main() {
	mat randomMatrix = randn(8, 8);
	cx_mat a = dfrntKernel(0.5, 0.5, randomMatrix);

	return 0;
}