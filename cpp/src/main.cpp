#include "test.h"
using namespace watermark;

int main(int argc, char *argv[]) {
	test::image_qdfrnt(
		"C:/Users/Administrator/Desktop/lena.bmp",
		"C:/Users/Administrator/Desktop/lena-output.bmp",
		"C:/Users/Administrator/Desktop/lena-restored.bmp",
		"C:/Users/Administrator/Desktop/lena-cycle.bmp"
	);

    return 0;
}