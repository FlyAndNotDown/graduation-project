export class Complex {
    public real: number;
    public imag: number;
    public constructor(real: number, imag: number) {
        this.real = real;
        this.imag = imag;
    }
    
    public static add(a: Complex, b: Complex): Complex {
        return new Complex(a.real + b.real, a.imag + b.imag);
    }

    public static sub(a: Complex, b: Complex): Complex {
        return new Complex(a.real - b.real, a.imag - b.imag);
    }

    public static mul(a: Complex, b: number): Complex;
    public static mul(a: Complex, b: Complex): Complex;
    public static mul(a: Complex, b: any): Complex {
        if (typeof b === 'number') {
            return new Complex(a.real * b, a.imag * b);
        } else {
            return new Complex(
                a.real * b.real - a.imag * b.imag,
                a.imag * b.real + a.real * b.imag
            );
        }
    }

    public static div(a: Complex, b: Complex): Complex {
        return new Complex(
            (a.real * b.real + a.imag * b.imag) / (b.real * b.real + b.imag * b.imag),
            (a.imag * b.real - a.real * b.imag) / (b.real * b.real + b.imag * b.imag)
        );
    }
}