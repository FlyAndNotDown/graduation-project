export class Complex {
    public real: number;
    public imag: number;
    public constructor(real: number, imag: number) {
        this.real = real;
        this.imag = imag;
    }

    public copy(): Complex {
        return new Complex(this.real, this.imag);
    }

    public add(other: Complex): Complex {
        return new Complex(this.real + other.real, this.imag + other.imag);
    }

    public sub(other: Complex): Complex {
        return new Complex(this.real - other.real, this.imag - other.imag);
    }

    public mul(other: number): Complex;
    public mul(other: Complex): Complex;
    public mul(other: any): Complex {
        if (typeof other === 'number') {
            return new Complex(this.real * other, this.imag * other);
        } else {
            return new Complex(
                this.real * other.real - this.imag * other.imag,
                this.imag * other.real + this.real * other.imag
            );
        }
    }

    public div(other: Complex): Complex {
        return new Complex(
            (this.real * other.real + this.imag * other.imag) / (other.real * other.real + other.imag * other.imag),
            (this.imag * other.real - this.real * other.imag) / (other.real * other.real + other.imag * other.imag)
        );
    }

    public exp(): Complex {
        if (this.real !== 0) {
            throw new Error('real part of complex should be zero');
        }
        return new Complex(
            Math.cos(this.imag),
            Math.sin(this.imag)
        );
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