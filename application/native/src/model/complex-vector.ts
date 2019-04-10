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

    // TODO
}