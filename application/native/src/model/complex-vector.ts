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
}