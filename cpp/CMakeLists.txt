cmake_minimum_required (VERSION 3.8)

include_directories (include)
aux_source_directory (src src)

include_directories ($ENV{ARMADILLO_INCLUDE_DIR})

if (WIN32)
    link_directories ($ENV{ARMADILLO_LIB_DIR})
    add_executable (${PROJECT_NAME} src/cpp.cpp)
    target_link_libraries(${PROJECT_NAME} blas_win64_MT.lib lapack_win64_MT.lib)
elseif (UNIX)
endif ()
