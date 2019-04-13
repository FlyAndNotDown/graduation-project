import { Matrix2D } from './matrix2d';
import { VectorWithChannels } from './vector-with-channels';

export enum ConvertToVectorWithChannelsArrayType {
    RowAsVector,
    ColAsVector
}
export enum RestoreFromVectorWithChannelsArrayType {
    RowAsVector,
    ColAsVector
}
export enum AddEmptyChannelType {
    Front,
    Back
}
export enum RemoveChannelType {
    Front,
    Back
}

export class Matrix3D {
    private data: number[][][];
    public rows: number;
    public cols: number;
    public channels: number;

    constructor(data: number[][][]) {
        this.data = data;
        this.rows = data.length;
        this.cols = data[0].length;
        this.channels = data[0][0].length;
    }

    public static zeros(rows: number, cols: number, channels: number): Matrix3D {
        let data: number[][][] = [];
        for (let i: number = 0; i < rows; i++) {
            let row: number[][] = [];
            for (let j: number = 0; j < cols; j++) {
                let col: number[] = [];
                for (let k: number = 0; k < channels; k++) {
                    col.push(0);
                }
                row.push(col);
            }
            data.push(row);
        }
        return new Matrix3D(data);
    }

    public copy(): Matrix3D {
        let result: Matrix3D = Matrix3D.zeros(this.rows, this.cols, this.channels);
        for (let i: number = 0; i < result.rows; i++) {
            for (let j: number = 0; j < result.cols; j++) {
                for (let k: number = 0; k < result.channels; k++) {
                    result.set(i, j, k, this.get(i, j, k));
                }
            }
        }
        return result;
    }

    public get(i: number, j: number, k: number): number {
        return this.data[i][j][k];
    }

    public set(i: number, j: number, k: number, item: number): void {
        this.data[i][j][k] = item;
    }

    public getData(): number[][][] {
        return this.data;
    }
    
    public convertToMatrix2DArray(): Matrix2D[] {
        let result: Matrix2D[] = [];
        
        for (let i: number = 0; i < this.channels; i++) {
            let matrix: Matrix2D = Matrix2D.zeros(this.rows, this.cols);
            for (let j: number = 0; j < this.rows; j++) {
                for (let k: number = 0; k < this.cols; k++) {
                    matrix.set(j, k, this.get(j, k, i));
                }
            }
            result.push(matrix);
        }

        return result;
    }

    public convertToVectorWithChannelsArray(type: ConvertToVectorWithChannelsArrayType): VectorWithChannels[] {
        let result: VectorWithChannels[] = [];

        if (type === ConvertToVectorWithChannelsArrayType.RowAsVector) {
            for (let i: number = 0; i < this.rows; i++) {
                let vectorSource: number[][] = [];
                for (let j: number = 0; j < this.cols; j++) {
                    let pixel: number[] = [];
                    for (let k: number = 0; k < this.channels; k++) {
                        pixel.push(this.get(i, j, k));
                    }
                    vectorSource.push(pixel);
                }
                result.push(new VectorWithChannels(vectorSource));
            }
        } else {
            for (let i: number = 0; i < this.cols; i++) {
                let vectorSource: number[][] = [];
                for (let j: number = 0; j < this.rows; j++) {
                    let pixel: number[] = [];
                    for (let k: number = 0; k < this.channels; k++) {
                        pixel.push(this.get(j, i, k));
                    }
                    vectorSource.push(pixel);
                }
                result.push(new VectorWithChannels(vectorSource));
            }
        }

        return result;
    }

    public static restoreFromVectorWithChannelsArray(type: RestoreFromVectorWithChannelsArrayType, vectors: VectorWithChannels[]) {
        if (type === RestoreFromVectorWithChannelsArrayType.RowAsVector) {
            let result: Matrix3D = Matrix3D.zeros(vectors.length, vectors[0].length, vectors[0].channels);
            for (let i: number = 0; i < result.rows; i++) {
                for (let j: number = 0; j < result.cols; j++) {
                    for (let k: number = 0; k < result.channels; k++) {
                        result.set(i, j, k, vectors[i].get(j, k));
                    }
                }
            }
            return result;
        } else {
            let result: Matrix3D = Matrix3D.zeros(vectors[0].length, vectors.length, vectors[0].channels);
            for (let i: number = 0; i < result.rows; i++) {
                for (let j: number = 0; j < result.cols; j++) {
                    for (let k: number = 0; k < result.channels; k++) {
                        result.set(i, j, k, vectors[j].get(i, k));
                    }
                }
            }
            return result;
        }
    }

    public addEmptyChannel(type: AddEmptyChannelType): Matrix3D {
        let result: Matrix3D = Matrix3D.zeros(this.rows, this.cols, this.channels + 1);

        for (let i: number = 0; i < this.rows; i++) {
            for (let j: number = 0; j < this.cols; j++) {
                for (let k: number = 0; k < this.channels + 1; k++) {
                    if (type === AddEmptyChannelType.Front) {
                        if (k === 0) {
                            result.set(i, j, k, 0);
                        } else {
                            result.set(i, j, k, this.get(i, j, k - 1));
                        }
                    } else {
                        if (k === this.channels) {
                            result.set(i, j, k, 0);
                        } else {
                            result.set(i, j, k, this.get(i, j, k));
                        }
                    }
                }
            }
        }

        return result;
    }

    public removeChannel(type: RemoveChannelType): Matrix3D {
        let result: Matrix3D = Matrix3D.zeros(this.rows, this.cols, this.channels - 1);

        for (let i: number = 0; i < this.rows; i++) {
            for (let j: number = 0; j < this.cols; j++) {
                for (let k: number = 0; k < this.channels - 1; k++) {
                    if (type === RemoveChannelType.Front) {
                        result.set(i, j, k, this.get(i, j, k + 1));
                    } else {
                        result.set(i, j, k, this.get(i, j, k));
                    }
                }
            }
        }

        return result;
    }
}