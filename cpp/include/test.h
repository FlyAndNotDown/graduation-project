#ifndef WATERMARK_TEST_H
#define WATERMARK_TEST_H

namespace watermark {
    class test {
        public:
			// tool
            static void tool_print_mat();
            static void tool_print_cx_mat();
			static void tool_print_cube();
			static void tool_print_cx_cube();
            static void tool_mat_to_cx_mat();
			static void tool_cube_to_cx_cube();
			static void tool_read_write_image(char *path, char *output_path);
			static void tool_read_write_color_image(char *path, char *output_path);
			static void tool_vectorize();
			static void tool_matrixize();
			static void tool_arnold(char *path, char *output_path, char *restored_path);

			// dfrnt_clan
            static void dfrnt_clan_kernel();
			static void dfrnt_clan_dfrnt();
			static void dfrnt_clan_dfrnt2();
			static void dfrnt_clan_qdfrnt();
			static void dfrnt_clan_qdfrnt2();

			// dfrft_clan
			static void dfrft_clan_kernel();
			static void dfrft_clan_dfrft();
			static void dfrft_clan_dfrft2();
			static void dfrft_clan_qdfrft();
			static void dfrft_clan_qdfrft2();

			// images
			static void image_qdfrnt2(char *path, char *output_path, char *restored_path, char *cycle_path);
			static void image_qdfrft2(char *path, char *output_path, char *restored_path);
	
			// mark
			static void mark_im_mark(char *source_path, char *secret_path, char *output_path, char *model_file, char *restored_path);
			static void mark_im_train(char *source_path, char *model_path);
	};
};

#endif