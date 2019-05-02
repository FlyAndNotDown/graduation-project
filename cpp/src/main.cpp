#include <cmdline.h>
#include <armadillo>
#include <opencv2/opencv.hpp>
#include "mark.h"
#include "tool.h"
#include "dfrnt_clan.h"
#include "dfrft_clan.h"
#include "test.h"
using namespace arma;
using namespace cv;
using namespace watermark;
using namespace cmdline;
using namespace std;

int main(int argc, char *argv[]) {
	/* test::mark_im_train(
		"C:\\Users\\Administrator\\Desktop\\lena.bmp",
		"C:\\Users\\Administrator\\Desktop\\model.dat"
	); */

	/* test::mark_im_mark(
		"C:\\Users\\Administrator\\Desktop\\lena.bmp",
		"C:\\Users\\Administrator\\Desktop\\secret.bmp",
		"C:\\Users\\Administrator\\Desktop\\marked.bmp",
		"C:\\Users\\Administrator\\Desktop\\model.dat",
		"C:\\Users\\Administrator\\Desktop\\marked.bmp",
		"C:\\Users\\Administrator\\Desktop\\restored.bmp"
	); */

	// create a parser
	parser cmdline_parser;
	
	// add arguments
	cmdline_parser.add<string>("type", 't', "mark type, can be \'svm\' or \'qc\'", true, "svm", oneof<string>("qc", "svm"));
	cmdline_parser.add<string>("algorithm", 'a', "algorithm type, can be \'qdfrnt\' or \'qdfrft\'", true, "qdfrnt", oneof<string>("qdfrnt", "qdfrft"));
	cmdline_parser.add<string>("action", 'c', "mark, restore or train", true, "mark", oneof<string>("mark", "restore", "train"));
	cmdline_parser.add<string>("source", 's', "source file path", false, "source.jpg");
	cmdline_parser.add<string>("output", 'o', "output file path", false, "output.jpg");
	cmdline_parser.add<string>("secret", 'e', "secret file path", false, "secret.jpg");
	cmdline_parser.add<string>("matrix", 'r', "random matrix file path", false, "matrix.dat");
	cmdline_parser.add<string>("keys", 'k', "watermark keys file path", false, "keys.dat");
	cmdline_parser.add<string>("model", 'm', "model file path", false, "model.dat");

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
	string keys_path = cmdline_parser.get<string>("keys");
	string model_path = cmdline_parser.get<string>("model");

	// start program
	// read source image
	cv::Mat source_image = imread(source_path);
	if (!type.compare("svm")) {
		cout << "[log] mark type is svm" << endl;

		if (!action.compare("mark")) {
			cout << "[log] start marking" << endl;
			cout << "[log] loading secret image" << endl;

			// read secret image
			cv::Mat secret_image = imread(secret_path, IMREAD_GRAYSCALE);
			
			if (!algorithm.compare("qdfrnt")) {
				cout << "[log] use qdfrnt transform" << endl;
				cout << "[log] generating random matrix" << endl;

				// get a random matrix & save it to file
				mat rd_matrix = randn(8, 8);
				tool::save_matrix_to_file(rd_matrix, matrix_path.data());

				// tool::print_mat("rd_matrix", rd_matrix);

				cout << "[log] get kernel matrix" << endl;

				// get kernel
				cx_mat kernel = dfrnt_clan::kernel(0.75, 1, rd_matrix);
				cx_mat inverse_kernel = dfrnt_clan::kernel(-0.75, 1, rd_matrix);

				// tool::print_cx_mat("kernel", kernel);

				// keys & output
				umat location_keys;
				cv::Mat output_image;

				cout << "[log] do transform & mark" << endl;

				// do mark
				mark::im_mark(mark::MARK_TYPE_QDFRNT, source_image, secret_image, output_image, location_keys, 3, kernel, inverse_kernel, 15);

				cout << "[log] saving result" << endl;

				// save keys & output
				tool::save_u_matrix_to_file(location_keys, keys_path.data());
				imwrite(output_path, output_image);

				cout << "[log] mark done" << endl;
			} else {
				cout << "[log] use qdfrft transform" << endl;
				cout << "[log] get kernel matrix" << endl;

				// get kernel
				cx_mat kernel = dfrft_clan::kernel(8, 0.5);
				cx_mat inverse_kernel = dfrft_clan::kernel(8, -0.5);

				// keys & output
				umat location_keys;
				cv::Mat output_image;

				cout << "[log] do transform & mark" << endl;

				// do mark
				mark::im_mark(mark::MARK_TYPE_QDFRFT, source_image, secret_image, output_image, location_keys, 3, kernel, inverse_kernel, 15);
			
				cout << "[log] saving result" << endl;

				// save keys & output
				tool::save_u_matrix_to_file(location_keys, keys_path.data());
				imwrite(output_path, output_image);

				cout << "[log] mark done" << endl;
			}
		} else if (!action.compare("train")) {
			cout << "[log] start training" << endl;
			cout << "[log] generating random secret sequence" << endl;

			// get random secret sequence
			uvec rd_secret_sequence = tool::get_random_secret_sequence(64, 64);

			if (!algorithm.compare("qdfrnt")) {
				cout << "[log] use qdfrnt transform" << endl;
				cout << "[log] generating random matrix" << endl;

				// generate a random matrix
				mat rd_matrix = randn(8, 8);
				
				cout << "[log] get kernel matrix" << endl;

				// get kernel matrix
				cx_mat kernel = dfrnt_clan::kernel(0.75, 1, rd_matrix);

				cout << "[log] do transform & training" << endl;
				
				// do training
				mark::im_train(mark::MARK_TYPE_QDFRNT, source_image, rd_secret_sequence, kernel, 15, model_path.data());
				
				cout << "[log] saving model" << endl;
				cout << "[log] train done" << endl;
			} else {
				cout << "[log] use qdfrft transform" << endl;
				cout << "[log] get kernel matrix" << endl;

				// get kernel matrix
				cx_mat kernel = dfrft_clan::kernel(8, 0.5);

				cout << "[log] do transform & training" << endl;

				// do training
				mark::im_train(mark::MARK_TYPE_QDFRFT, source_image, rd_secret_sequence, kernel, 15, model_path.data());

				cout << "[log] saving model" << endl;
				cout << "[log] train done" << endl;
			}
		} else {
			cout << "[log] start restoring" << endl;

			if (!algorithm.compare("qdfrnt")) {
				cout << "[log] use qdfrnt transform" << endl;
				cout << "[log] read random matrix from file" << endl;

				// read random matrix from file
				mat rd_matrix = tool::read_matrix_from_file(matrix_path.data());
				
				// tool::print_mat("rd_matrix", rd_matrix);

				cout << "[log] read keys from file" << endl;

				// read keys from file
				umat location_keys = tool::read_u_matrix_from_file(keys_path.data());

				cout << "[log] get kernel matrix" << endl;

				// get kernel matrix
				cx_mat kernel = dfrnt_clan::kernel(0.75, 1, rd_matrix);

				// tool::print_cx_mat("kernel", kernel);

				// result var
				cv::Mat restored_image;

				cout << "[log] do transform & restore" << endl;

				// do restore
				mark::im_restore(mark::MARK_TYPE_QDFRNT, source_image, restored_image, 3, kernel, location_keys, model_path.data());

				cout << "[log] save result" << endl;

				// save restored watermark to file
				imwrite(output_path, restored_image);

				cout << "[log] restore done" << endl;
			} else {
				cout << "[log] use qdfrft transform" << endl;

				cout << "[log] read keys from file" << endl;

				// read keys from file
				umat location_keys = tool::read_u_matrix_from_file(keys_path.data());

				cout << "[log] get kernel matrix" << endl;

				// get kernel matrix
				cx_mat kernel = dfrft_clan::kernel(8, 0.5);
				cx_mat inverse_kernel = dfrft_clan::kernel(8, -0.5);

				// result var
				cv::Mat restored_image;

				cout << "[log] do transform & restore" << endl;

				// do restore
				mark::im_restore(mark::MARK_TYPE_QDFRFT, source_image, restored_image, 3, kernel, location_keys, model_path.data());

				cout << "[log] save result" << endl;

				// save restored watermark to file
				imwrite(output_path, restored_image);

				cout << "[log] restore done" << endl;
			}
		}
	} else {
		// TODO if type is 'qc'
		cout << "[log] mark type is qc" << endl;
		cout << "[log] mark with type qc is not supported now." << endl;
	}

	return 0;
}