import { ComplexVector } from './complex-vector';
import { Complex } from './complex';

export class ComplexVectorWithChannels {
    private data: Complex[][];
    public length: number;
    public channels: number;

    constructor(data?: Complex[][]) {
        this.data = data;
        this.length = data.length;
        this.channels = data[0].length;
    }

    public static zeros(length: number, channels: number): ComplexVectorWithChannels {
        let data: Complex[][] = [];
        for (let i: number = 0; i < length; i++) {
            let pixel: Complex[] = [];
            for (let j: number = 0; j < channels; j++) {
                pixel.push(new Complex(0, 0));
            }
            data.push(pixel);
        }
        return new ComplexVectorWithChannels(data);
    }

    public get(i: number, j: number): Complex {
        return this.data[i][j];
    }

    public set(i: number, j: number, item: Complex): void {
        this.data[i][j] = item;
    }

    public getData(): Complex[][] {
        return this.data;
    }

    public copy(): ComplexVectorWithChannels {
        let result: ComplexVectorWithChannels = ComplexVectorWithChannels.zeros(this.length, this.channels);
        for (let i: number = 0; i < this.length; i++) {
            for (let j: number = 0; j < this.channels; j++) {
                result.set(i, j, this.get(i, j).copy());
            }
        }
        return result;
    }

    public convertToComplexVectorArray(): ComplexVector[] {
        let result: ComplexVector[] = [];
        for (let i: number = 0; i < this.channels; i++) {
            let vector: ComplexVector = ComplexVector.zeros(this.length);
            for (let j: number = 0; j < this.length; j++) {
                vector.set(j, this.get(j, i).copy());
            }
            result.push(vector);
        }
        return result;
    }

    public static restoreFromComplexVectorArray(vectors: ComplexVector[]): ComplexVectorWithChannels {
        let channels: number = vectors.length;
        let length: number = channels === 0 ? 0 : vectors[0].length;
        let result: ComplexVectorWithChannels = ComplexVectorWithChannels.zeros(length, channels);
        for (let i: number = 0; i < length; i++) {
            for (let j: number = 0; j < channels; j++) {
                result.set(i, j, vectors[j].get(i).copy());
            }
        }
        return result;
    }
}