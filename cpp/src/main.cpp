#include "test.h"
using namespace watermark;

int main(int argc, char *argv[]) {
	test::tool_arnold(
		"C:\\Users\\Administrator\\Desktop\\lena.bmp",
		"C:\\Users\\Administrator\\Desktop\\lena-arnold.bmp",
		"C:\\Users\\Administrator\\Desktop\\lena-arnold-restored.bmp"
	);

    return 0;
}