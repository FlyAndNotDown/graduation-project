#ifndef NATIVE_COMPLEX_H
#define NATIVE_COMPLEX_H

class Complex {
    public:
        double real;
        double imag;
        Complex(double real, double imag);
        Complex* copy();
        Complex* add(Complex* complex);
        Complex* sub(Complex* complex);
        Complex* mul(double number);
        Complex* mul(Complex* complex);
        Complex* div(Complex* complex);
        Complex* exp(Complex* complex);
};

#endif
