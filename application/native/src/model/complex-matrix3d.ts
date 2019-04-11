import { ComplexMatrix2D } from './complex-matrix2d';
import { Complex } from './complex';

export enum AddEmptyChannelType {
    Front,
    Back
}

export class ComplexMatrix3D {
    private data: Complex[][][];
    public rows: number;
    public cols: number;
    public channels: number;

    constructor(data: Complex[][][]) {
        this.data = data;
        this.rows = data.length;
        this.cols = data[0].length;
        this.channels = data[0][0].length;
    }

    public static zeros(rows: number, cols: number, channels: number): ComplexMatrix3D {
        let data: Complex[][][] = [];
        for (let i: number = 0; i < rows; i++) {
            let row: Complex[][] = [];
            for (let j: number = 0; j < cols; j++) {
                let col: Complex[] = [];
                for (let k: number = 0; k < channels; k++) {
                    col.push(new Complex(0, 0));
                }
                row.push(col);
            }
            data.push(row);
        }
        return new ComplexMatrix3D(data);
    }

    public get(i: number, j: number, k: number): Complex {
        return this.data[i][j][k];
    }

    public set(i: number, j: number, k: number, item: Complex): void {
        this.data[i][j][k] = item;
    }

    public getData(): Complex[][][] {
        return this.data;
    }

    public copy(): ComplexMatrix3D {
        let result: ComplexMatrix3D = ComplexMatrix3D.zeros(this.rows, this.cols, this.channels);
        for (let i: number = 0; i < result.rows; i++) {
            for (let j: number = 0; j < result.cols; j++) {
                for (let k: number = 0; k < result.channels; k++) {
                    result.set(i, j, k, this.get(i, j, k).copy());
                }
            }
        }
        return result;
    }

    public convertToComplexMatrix2DArray(): ComplexMatrix2D[] {
        let result: ComplexMatrix2D[] = [];
        
        for (let i: number = 0; i < this.channels; i++) {
            let matrix: ComplexMatrix2D = ComplexMatrix2D.zeros(this.rows, this.cols);
            for (let j: number = 0; j < this.rows; j++) {
                for (let k: number = 0; k < this.cols; k++) {
                    matrix.set(j, k, this.get(j, k, i).copy());
                }
            }
            result.push(matrix);
        }

        return result;
    }

    public addEmptyChannel(type: AddEmptyChannelType): ComplexMatrix3D {
        let result: ComplexMatrix3D = ComplexMatrix3D.zeros(this.rows, this.cols, this.channels + 1);
    
        for (let i: number = 0; i < this.rows; i++) {
            for (let j: number = 0; j < this.cols; j++) {
                for (let k: number = 0; k < this.channels + 1; k++) {
                    if (type === AddEmptyChannelType.Front) {
                        if (k === 0) {
                            result.set(i, j, k, new Complex(0, 0));
                        } else {
                            result.set(i, j, k, this.get(i, j, k - 1).copy());
                        }
                    } else {
                        if (k === this.channels) {
                            result.set(i, j, k, new Complex(0, 0));
                        } else {
                            result.set(i, j, k, this.get(i, j, k).copy());
                        }
                    }
                }
            }
        }

        return result;
    }
}