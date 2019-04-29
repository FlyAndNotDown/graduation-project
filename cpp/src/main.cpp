#include "test.h"
#include <opencv2/opencv.hpp>
using namespace watermark;
using namespace cv;
using namespace std;

int main(int argc, char *argv[]) {
	/* test::tool_arnold(
		"C:\\Users\\Administrator\\Desktop\\lena.bmp",
		"C:\\Users\\Administrator\\Desktop\\lena-arnold.bmp",
		"C:\\Users\\Administrator\\Desktop\\lena-arnold-restored.bmp"
	); */

	cv::Mat image = imread("C:\\Users\\Administrator\\Desktop\\lena.bmp");
	cv::Mat channels[3], edge;
	cv::split(image, channels);

	blur(channels[0], edge, Size(9, 9));
	Canny(edge, edge, 3, 9);

    return 0;
}