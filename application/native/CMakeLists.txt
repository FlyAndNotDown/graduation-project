cmake_minimum_required(VERSION 3.13)
project(native)

set(CMAKE_CXX_STANDARD 17)

add_executable(native src/main.cpp include/vector.h src/vector.cpp)