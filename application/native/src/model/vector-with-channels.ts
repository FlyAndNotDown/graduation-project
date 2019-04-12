import { Vector } from './vector';
export class VectorWithChannels {
    private data: number[][];
    public length: number;
    public channels: number;

    constructor(data?: number[][]) {
        this.data = data;
        this.length = data.length;
        this.channels = data[0].length;
    }

    public static zeros(length: number, channels: number): VectorWithChannels {
        let data: number[][] = [];
        for (let i: number = 0; i < length; i++) {
            let pixel: number[] = [];
            for (let j: number = 0; j < channels; j++) {
                pixel.push(0);
            }
            data.push(pixel);
        }
        return new VectorWithChannels(data);
    }

    public get(i: number, j: number): number {
        return this.data[i][j];
    }

    public set(i: number, j: number, item: number): void {
        this.data[i][j] = item;
    }

    public getData(): number[][] {
        return this.data;
    }

    public copy(): VectorWithChannels {
        let result: VectorWithChannels = VectorWithChannels.zeros(this.length, this.channels);
        for (let i: number = 0; i < this.length; i++) {
            for (let j: number = 0; j < this.channels; j++) {
                result.set(i, j, this.get(i, j));
            }
        }
        return result;
    }

    public convertToVectorArray(): Vector[] {
        let result: Vector[] = [];
        for (let i: number = 0; i < this.channels; i++) {
            let vector: Vector = Vector.zeros(this.length);
            for (let j: number = 0; j < this.length; j++) {
                vector.set(j, this.get(j, i));
            }
            result.push(vector);
        }
        return result;
    }

    public static restoreFromVectorArray(vectors: Vector[]): VectorWithChannels {
        let length: number = vectors.length;
        let channels: number = length === 0 ? 0 : vectors[0].length;
        let result: VectorWithChannels = VectorWithChannels.zeros(length, channels);
        for (let i: number = 0; i < length; i++) {
            for (let j: number = 0; j < channels; j++) {
                result.set(i, j, vectors[j].get(i));
            }
        }
        return result;
    }
}