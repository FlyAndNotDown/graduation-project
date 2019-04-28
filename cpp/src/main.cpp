#include "test.h"
#include "dfrft_clan.h"
using namespace watermark;

int main(int argc, char *argv[]) {
	cx_mat kernel = dfrft_clan::kernel(8, 0.5);

    return 0;
}