#include "test.h"
#include <opencv2/opencv.hpp>
using namespace watermark;
using namespace cv;
using namespace std;

int main(int argc, char *argv[]) {
	test::mark_im_train(
		"C:\\Users\\Administrator\\Desktop\\lena.bmp",
		"C:\\Users\\Administrator\\Desktop\\model.txt"
	);

	test::mark_im_mark(
		"C:\\Users\\Administrator\\Desktop\\lena.bmp",
		"C:\\Users\\Administrator\\Desktop\\secret.bmp",
		"C:\\Users\\Administrator\\Desktop\\lena-marked.bmp",
		"C:\\Users\\Administrator\\Desktop\\model.txt",
		"C:\\Users\\Administrator\\Desktop\\lena-restored.bmp"
	);

	return 0;
}