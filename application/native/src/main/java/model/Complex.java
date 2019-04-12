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
        return new Complex(this.real + complex.real, this.imag + complex.imag);
    }

    public Complex sub(Complex complex) {
        return new Complex(this.real - complex.real, this.imag - complex.imag);
    }

    public Complex mul(double number) {
        return new Complex(this.real * number, this.imag * number);
    }

    public Complex mul(Complex complex) {
        return new Complex(
                this.real * complex.real - this.imag * complex.imag,
                this.imag * complex.real + this.real * complex.imag
        );
    }

    public Complex div(Complex complex) {
        return new Complex(
                (this.real * complex.real + this.imag * complex.imag) / (complex.real * complex.real + complex.imag * complex.imag),
                (this.imag * complex.real - this.real * complex.imag) / (complex.real * complex.real + complex.imag * complex.imag)
        );
    }

    public Complex exp() {
        return new Complex(Math.cos(this.imag), Math.sin(this.imag));
    }
}
