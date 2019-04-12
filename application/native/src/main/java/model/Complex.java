package model;

public class Complex {
    public double real;
    public double imag;

    Complex(double real, double imag) {
        this.real = real;
        this.imag = imag;
    }

    public Complex copy() {
        return new Complex(this.real, this.imag);
    }

    public Complex add(Complex complex) {
        this.real = this.real + complex.real;
        this.imag = this.imag + complex.imag;
        return this;
    }

    public Complex sub(Complex complex) {
        this.real = this.real - complex.real;
        this.imag = this.imag - complex.imag;
        return this;
    }

    public Complex mul(Complex complex) {
        // TODO
        return null;
    }

    public Complex div(Complex complex) {
        // TODO
        return null;
    }

    public Complex exp() {
        // TODO
        return null;
    }
}
