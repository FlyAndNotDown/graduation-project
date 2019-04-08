import { MatrixTool } from './../tool/matrix';
import { Vector } from './vector';

export class Matrix2D {
    private data: number[][];
    public rows: number;
    public cols: number;

    constructor(data: number[][]) {
        this.data = data;
        this.rows = data.length;
        this.cols = data[0].length;
    }

    public static zeros(rows: number, cols: number): Matrix2D {
        let data: number[][] = [];
        for (let i: number = 0; i < rows; i++) {
            let row: number[] = [];
            for (let j: number = 0; j < cols; j++) {
                row.push(0);
            }
            data.push(row);
        }
        return new Matrix2D(data);
    }

    public static diagonal(elements: Vector): Matrix2D {
        let result: Matrix2D = Matrix2D.zeros(elements.length, elements.length);

        for (let i: number = 0; i < elements.length; i++) {
            result.set(i, i, elements.get(i));
        }

        return result;
    }

    public copy(): Matrix2D {
        let result: Matrix2D = Matrix2D.zeros(this.rows, this.cols);
        for (let i: number = 0; i < this.rows; i++) {
            for (let j: number = 0; j < this.cols; j++) {
                result.set(i, j, this.get(i, j));
            }
        }
        return result;
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

    public transport(): Matrix2D {
        let result: Matrix2D = Matrix2D.zeros(this.cols, this.rows);
        for (let i: number = 0; i < result.rows; i++) {
            for (let j: number = 0; j < result.cols; j++) {
                result.set(i, j, this.get(j, i));
            }
        }
        return result;
    }

    public add(other: Matrix2D): Matrix2D {
        if (this.rows !== other.rows || this.cols !== other.cols) {
            throw new Error('two matrix must have the same rows and cols');
        }

        let result: Matrix2D = Matrix2D.zeros(this.rows, this.cols);
        for (let i: number = 0; i < this.rows; i++) {
            for (let j: number = 0; j < this.cols; j++) {
                result.set(i, j, this.get(i, j) + other.get(i, j));
            }
        }

        return result;
    }

    public mul(other: Matrix2D): Matrix2D {
        if (this.cols !== other.rows) {
            throw new Error('cols of source matrix must be equal rows of dest matrix');
        }

        let result: Matrix2D = Matrix2D.zeros(this.rows, other.cols);
        for (let i: number = 0; i < this.rows; i++) {
            for (let j: number = 0; j < this.cols; j++) {
                let sum: number = 0;
                for (let k: number = 0; k < this.cols; k++) {
                    sum += this.get(i, k) * other.get(k, j);
                }
                result.set(i, j, sum);
            }
        }
        
        return result;
    }

    public div(other: number): Matrix2D {
        let result: Matrix2D = Matrix2D.zeros(this.rows, this.cols);
        for (let i: number = 0; i < this.rows; i++) {
            for (let j: number = 0; j < this.cols; j++) {
                result.set(i, j, this.get(i, j) / other);
            }
        }
        return result;
    }

    public eigenVectors(): Matrix2D {
        // TODO
        return null;
    }
}