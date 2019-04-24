#include "tool.h"
#include "qdfrnt.h"

int main() {
	// // dfrnt test
	// cx_vec source(4);
	// for (int i = 0; i < 4; i++) {
	// 	complex<double> cx(i + 1, 0);
	// 	source(i) = cx;
	// }

	// mat randomMatrix = randn(4, 4);
	// cx_mat kernel = qdfrnt::kernel(0.25, 1, randomMatrix);
	// cx_mat iKernel = qdfrnt::kernel(-0.25, 1, randomMatrix);

	// cx_vec output = qdfrnt::dfrnt(source, kernel);
	// cx_vec restored = qdfrnt::dfrnt(output, iKernel);
	// output = qdfrnt::dfrnt(output, kernel);
	// output = qdfrnt::dfrnt(output, kernel);
	// output = qdfrnt::dfrnt(output, kernel);

	// tool::print_cx_mat_data(source);
	// tool::print_cx_mat_data(output);
	// tool::print_cx_mat_data(restored);

	
	// dfrnt2 test
	cx_mat source(4, 4);
	for (int i = 0; i < 4; i++) {
		for (int j = 0; j < 4; j++) {
			complex<double> cx(i * 4 + j, 0);
			source(i, j) = cx;
		}
	}

	mat randomMatrix = randn(4, 4);
	cx_mat kernel = qdfrnt::kernel(0.25, 1, randomMatrix);
	cx_mat iKernel = qdfrnt::kernel(-0.25, 1, randomMatrix);

	cx_mat output = qdfrnt::dfrnt2(source, 4, kernel);
	cx_mat restored = qdfrnt::dfrnt2(output, 4, iKernel);
	output = qdfrnt::dfrnt2(output, 4, kernel);
	output = qdfrnt::dfrnt2(output, 4, kernel);
	output = qdfrnt::dfrnt2(output, 4, kernel);

	tool::print_cx_mat_data(source);
	tool::print_cx_mat_data(output);
	tool::print_cx_mat_data(restored);

	return 0;
}