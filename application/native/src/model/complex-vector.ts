import { ComplexMatrix2D } from './complex-matrix2d';
import { Complex } from './complex';

export class ComplexVector {
    private data: Complex[];
    public length: number;

    constructor(data?: Complex[]) {
        this.data = data;
        this.length = data.length;
    }

    public static zeros(length: number): ComplexVector {
        let data: Complex[] = [];
        for (let i: number = 0; i < length; i++) {
            data.push(new Complex(0, 0));
        }
        return new ComplexVector(data);
    }

    public copy(): ComplexVector {
        let result: ComplexVector = ComplexVector.zeros(this.length);
        for (let i: number = 0; i < result.length; i++) {
            result.set(i, this.get(i).copy());
        }
        return result;
    }

    public get(i: number): Complex {
        return this.data[i];
    }

    public set(i: number, item: Complex): void {
        this.data[i] = item;
    }

    public getData(): Complex[] {
        return this.data;
    }

    public add(other: ComplexVector): ComplexVector {
        if (this.length !== other.length) {
            throw new Error('two vector should have the save length');
        }

        let result: ComplexVector = ComplexVector.zeros(this.length);
        for (let i: number = 0; i < this.length; i++) {
            result.set(i, this.get(i).add(other.get(i)));
        }

        return result;
    }

    public sub(other: ComplexVector): ComplexVector {
        if (this.length !== other.length) {
            throw new Error('two vector should have the save length');
        }

        let result: ComplexVector = ComplexVector.zeros(this.length);
        for (let i: number = 0; i < this.length; i++) {
            result.set(i, this.get(i).sub(other.get(i)));
        }

        return result;
    }

    public convertToComplexMatrix2D(): ComplexMatrix2D {
        let result: ComplexMatrix2D = ComplexMatrix2D.zeros(1, this.length);
        for (let i: number = 0; i < this.length; i++) {
            result.set(0, i, this.get(i).copy());
        }
        return result;
    }
}