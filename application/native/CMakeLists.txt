cmake_minimum_required(VERSION 3.13)
project(native)

set(CMAKE_CXX_STANDARD 17)

add_executable(native src/main.cpp include/model/vector.h src/model/vector.cpp include/algorithm/qdfrnt.h src/algorithm/qdfrnt.cpp include/model/complex.h src/model/complex.cpp)