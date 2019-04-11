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
            let elem: Complex[] = [];
            for (let j: number = 0; j < channels; j++) {
                elem.push(new Complex(0, 0));
            }
            data.push(elem);
        }
        return new ComplexVectorWithChannels(data);
    }

    public copy(): ComplexVectorWithChannels {
        let result: ComplexVectorWithChannels = ComplexVectorWithChannels.zeros(this.length, this.channels);
        for (let i: number = 0; i < result.length; i++) {
            for (let j: number = 0; j < result.channels; j++) {
                result.set(i, j, this.get(i, j).copy());
            }
        }
        return result;
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

    public convertToComplexVectorArray(): ComplexVector[] {
        let result: ComplexVector[] = [];
        for (let i: number = 0; i < this.channels; i++) {
            let channel: ComplexVector = ComplexVector.zeros(this.length);
            for (let j: number = 0; j < this.length; j++) {
                channel.set(j, this.get(j, i).copy());
            }
            result.push(channel);
        }
        return result;
    }

    public static restoreFromComplexVectorArray(vectors: ComplexVector[]): ComplexVectorWithChannels {
        let result: ComplexVectorWithChannels = ComplexVectorWithChannels.zeros(vectors[0].length, vectors.length);
        for (let i: number = 0; i < vectors[0].length; i++) {
            for (let j: number = 0; j < vectors.length; j++) {
                result.set(i, j, vectors[j].get(i));
            }
        }
        return result;
    }
}