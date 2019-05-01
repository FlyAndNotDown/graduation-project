#include <cmdline.h>
#include <armadillo>
#include <opencv2/opencv.hpp>
#include "mark.h"
#include "tool.h"
using namespace arma;
using namespace cv;
using namespace watermark;
using namespace cmdline;
using namespace std;

int main(int argc, char *argv[]) {
	// create a parser
	parser cmdline_parser;
	
	// add arguments
	cmdline_parser.add<string>("type", 't', "mark type", true, "svm", oneof<string>("qc", "svm"));
	cmdline_parser.add<string>("algorithm", 'a', "algorithm type", true, "qdfrnt", oneof<string>("qdfrnt", "qdfrft"));
	cmdline_parser.add<string>("action", 'm', "mark or restore", true, "mark", oneof<string>("mark", "restore"));
	cmdline_parser.add<string>("source", 's', "source file path", false, "source.jpg");
	cmdline_parser.add<string>("output", 'o', "output file path", false, "output.jpg");
	cmdline_parser.add<string>("secret", 'e', "secret file path", false, "secret.jpg");
	cmdline_parser.add<string>("matrix", 'r', "random matrix file path", false, "matrix.dat");
	cmdline_parser.add<string>("keys", 'k', "watermark keys file path", false, "keys.dat");

	// do parser
	cmdline_parser.parse_check(argc, argv);

	// get params
	string type = cmdline_parser.get<string>("type");
	string algorithm = cmdline_parser.get<string>("algorithm");
	string action = cmdline_parser.get<string>("action");
	string source_path = cmdline_parser.get<string>("source");
	string output_path = cmdline_parser.get<string>("output");
	string secret_path = cmdline_parser.get<string>("secret");
	string matrix_path = cmdline_parser.get<string>("matrix");
	string keys_path = cmdline_parser.get<string>("keys_path");

	// start program
	// read source image
	cv::Mat source_image = imread(source_path);
	if (!type.compare("svm")) {
		if (!action.compare("mark")) {
			// read secret image
			cv::Mat secret_image = imread(secret_path);
			
			// get a random matrix & save it to file
			mat rd_matrix = randn(8, 8);
			// TODO

		} else {
			
		}
	} else {
		// TODO if type is 'qc'
		cout << "\'qc\' mark is not supported now." << endl;
	}

	return 0;
}