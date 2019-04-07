import { Matrix2D } from './matrix2d';

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
}