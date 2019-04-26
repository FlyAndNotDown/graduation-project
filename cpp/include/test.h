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
            
			// dfrnt_clan
            static void dfrnt_clan_kernel();
			static void dfrnt_clan_dfrnt();
			static void dfrnt_clan_dfrnt2();
			static void dfrnt_clan_qdfrnt();
			static void dfrnt_clan_qdfrnt2();
    };
};

#endif