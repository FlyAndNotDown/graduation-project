#include "../../include/model/complex.h"
#include <cmath>

Complex::Complex(double real, double imag) {
    this->real = real;
    this->imag = imag;
}

Complex* Complex::copy() {
    return new Complex(this->real, this->imag);
}

Complex* Complex::add(Complex *complex) {
    this->real = this->real + complex->real;
    this->imag = this->imag + complex->imag;
    return this;
}

Complex* Complex::sub(Complex *complex) {
    this->real = this->real - complex->real;
    this->imag = this->imag - complex->imag;
    return this;
}

Complex* Complex::mul(double number) {
    this->real = this->real * number;
    this->imag = this->imag * number;
    return this;
}

Complex* Complex::mul(Complex *complex) {
    double real = this->real;
    double imag = this->imag;
    this->real = real * complex->real - imag * complex->imag;
    this->imag = imag * complex->real + real * complex->imag;
    return this;
}

Complex* Complex::div(Complex *complex) {
    double real = this->real;
    double imag = this->imag;
    this->real = (real * complex->real + imag * complex->imag) / (complex->real * complex->real + complex->imag * complex->imag);
    this->imag = (imag * complex->real - real * complex->imag) / (complex->real * complex->real + complex->imag * complex->imag);
    return this;
}

Complex* Complex::exp(Complex *complex) {
    this->real = cos(this->imag);
    this->imag = sin(this->imag);
    return this;
}