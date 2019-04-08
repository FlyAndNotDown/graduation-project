import { Vector } from './vector';

export enum ConvertToVectorArrayType {
    RowAsVector,
    ColAsVector
};

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
        const precision: number = 0.0001;
        const iterationTime: number = 10;
        let dimension: number = this.rows;

        let matrix: Matrix2D = this.copy();
        let diagSource: number[] = [];
        for (let i: number = 0; i < dimension; i++) { diagSource.push(1); }
        let eigVectors: Matrix2D = Matrix2D.diagonal(new Vector(diagSource));

        let count: number = 0;
        while (true) {
            let max: number = Math.abs(matrix.get(0, 1));
            let row: number = 0;
            let col: number = 1;
            for (let i: number = 0; i < dimension; i++) {
                for (let j: number = 0; j < dimension; j++) {
                    let temp: number = Math.abs(matrix.get(i, j));
                    if (i !== j && temp > max) {
                        max = temp;
                        row = i;
                        col = j;
                    }
                }
            }

            if (max < precision || count > iterationTime) { break; }
            count++;

            let app: number = matrix.get(row, row);
            let apq: number = matrix.get(row, col);
            let aqq: number = matrix.get(col, col);
            let angle: number = 0.5 * Math.atan2(-2 * apq, aqq - app);
            let sin: number = Math.sin(angle);
            let cos: number = Math.cos(angle);
            let sin2: number = Math.sin(2 * angle);
            let cos2: number = Math.cos(2 * angle);
            matrix.set(row, row, app * cos * cos + aqq * sin * sin + 2 * apq * cos * sin);
            matrix.set(col, col, app * sin * sin + aqq * cos * cos - 2 * apq * cos * sin);
            matrix.set(row, col, 0.5 * (aqq - app) * sin2 + apq * cos2);
            matrix.set(col, row, matrix.get(row, col));

            for (let i: number = 0; i < dimension; i++) {
                if (i !== col && i !== row) {
                    max = matrix.get(i, row);
                    matrix.set(i, row, matrix.get(i, col) * sin + max * cos);
                    matrix.set(i, col, matrix.get(i, col) * cos - max * sin);
                }
            }

            for (let i: number = 0; i < dimension; i++) {
                if (i !== col && i !== row) {
                    max = matrix.get(row, i);
                    matrix.set(row, i, matrix.get(col, i) * sin + max * cos);
                    matrix.set(col, i, matrix.get(col, i) * cos - max * sin);
                }
            }

            for (let i: number = 0; i < dimension; i++) {
                max = eigVectors.get(i, row);
                eigVectors.set(i, row, eigVectors.get(i, col) * sin + max * cos);
                eigVectors.set(i, col, eigVectors.get(i, col) * cos - max * sin);
            }
        }

        // get eigValues
        // @see https://blog.csdn.net/webzhuce/article/details/85013301
        return eigVectors;
    }

    public convertToVectorArray(type: ConvertToVectorArrayType): Vector[] {
        let result: Vector[] = [];
        
        if (type === ConvertToVectorArrayType.RowAsVector) {
            for (let i: number = 0; i < this.rows; i++) {
                let vectorSource: number[] = [];
                for (let j: number = 0; j < this.cols; j++) {
                    vectorSource.push(this.get(i, j));
                }
                result.push(new Vector(vectorSource));
            }
        } else {
            for (let i: number = 0; i < this.cols; i++) {
                let vectorSource: number[] = [];
                for (let j: number = 0; j < this.rows; j++) {
                    vectorSource.push(this.get(j, i));
                }
                result.push(new Vector(vectorSource));
            }
        }
        
        return result;
    }
}