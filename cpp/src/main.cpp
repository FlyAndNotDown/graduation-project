#include "test.h"
using namespace watermark;

int main(int argc, char *argv[]) {
	test::tool_read_write_color_image(
		"C:/Users/Administrator/Desktop/lena.bmp",
		"C:/Users/Administrator/Desktop/lena-output.bmp"
	);

    return 0;
}