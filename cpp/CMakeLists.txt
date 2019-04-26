cmake_minimum_required (VERSION 3.8)

project (WATERMARK)

include_directories (include)
aux_source_directory (src SRC_DIR)
add_library (SRC_LIB ${SRC_DIR})

include_directories ($ENV{ARMADILLO_INCLUDE_DIR})

if (WIN32)
    link_directories ($ENV{ARMADILLO_LIB_DIR})
    add_executable (${PROJECT_NAME} src/main.cpp)
    target_link_libraries (${PROJECT_NAME} SRC_LIB)
    target_link_libraries (${PROJECT_NAME} blas_win64_MT.lib lapack_win64_MT.lib)
elseif (UNIX)
endif ()
