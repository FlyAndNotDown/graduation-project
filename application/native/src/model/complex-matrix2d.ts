import { ComplexVector } from './complex-vector';
import { Complex } from './complex';

export enum ConvertToComplexVectorArrayType {
    RowAsVector,
    ColAsVector
};
export enum RestoreFromComplexVectorArrayType {
    RowAsVector,
    ColAsVector
};

export class ComplexMatrix2D {
    private data: Complex[][];
    public rows: number;
    public cols: number;

    constructor(data: Complex[][]) {
        this.data = data;
        this.rows = data.length;
        this.cols = data[0].length;
    }

    public static zeros(rows: number, cols: number): ComplexMatrix2D {
        let data: Complex[][] = [];
        for (let i: number = 0; i < rows; i++) {
            let row: Complex[] = [];
            for (let j: number = 0; j < cols; j++) {
                row.push(new Complex(0, 0));
            }
            data.push(row);
        }
        return new ComplexMatrix2D(data);
    }

    public static diagonal(elements: ComplexVector): ComplexMatrix2D {
        let result: ComplexMatrix2D = ComplexMatrix2D.zeros(elements.length, elements.length);

        for (let i: number = 0; i < elements.length; i++) {
            result.set(i, i, elements.get(i).copy());
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

    public copy(): ComplexMatrix2D {
        let result: ComplexMatrix2D = ComplexMatrix2D.zeros(this.rows, this.cols);
        for (let i: number = 0; i < this.rows; i++) {
            for (let j: number = 0; j < this.cols; j++) {
                result.set(i, j, this.get(i, j).copy());
            }
        }
        return result;
    }

    public transport(): ComplexMatrix2D {
        let result: ComplexMatrix2D = ComplexMatrix2D.zeros(this.cols, this.rows);
        for (let i: number = 0; i < result.rows; i++) {
            for (let j: number = 0; j < result.cols; j++) {
                result.set(i, j, this.get(j, i).copy());
            }
        }
        return result;
    }

    public add(other: ComplexMatrix2D): ComplexMatrix2D {
        if (this.rows !== other.rows || this.cols !== other.cols) {
            throw new Error('two matrix must have the same rows and cols');
        }

        let result: ComplexMatrix2D = ComplexMatrix2D.zeros(this.rows, this.cols);
        for (let i: number = 0; i < this.rows; i++) {
            for (let j: number = 0; j < this.cols; j++) {
                result.set(i, j, this.get(i, j).add(other.get(i, j)));
            }
        }

        return result;
    }

    public mul(other: ComplexMatrix2D): ComplexMatrix2D {
        if (this.cols !== other.rows) {
            throw new Error('cols of source matrix must be equal rows of dest matrix');
        }

        let result: ComplexMatrix2D = ComplexMatrix2D.zeros(this.rows, other.cols);
        for (let i: number = 0; i < this.rows; i++) {
            for (let j: number = 0; j < this.cols; j++) {
                let sum: Complex = new Complex(0, 0);
                for (let k: number = 0; k < this.cols; k++) {
                    sum = sum.add(this.get(i, k).mul(other.get(k, j)));
                }
                result.set(i, j, sum);
            }
        }
        
        return result;
    }

    public convertToComplexVectorArray(type: ConvertToComplexVectorArrayType): ComplexVector[] {
        let result: ComplexVector[] = [];
        
        if (type === ConvertToComplexVectorArrayType.RowAsVector) {
            for (let i: number = 0; i < this.rows; i++) {
                let vectorSource: Complex[] = [];
                for (let j: number = 0; j < this.cols; j++) {
                    vectorSource.push(this.get(i, j).copy());
                }
                result.push(new ComplexVector(vectorSource));
            }
        } else {
            for (let i: number = 0; i < this.cols; i++) {
                let vectorSource: Complex[] = [];
                for (let j: number = 0; j < this.rows; j++) {
                    vectorSource.push(this.get(j, i).copy());
                }
                result.push(new ComplexVector(vectorSource));
            }
        }
        
        return result;
    }

    public static restoreFromComplexVectorArray(type: RestoreFromComplexVectorArrayType, vectors: ComplexVector[]): ComplexMatrix2D {
        if (type === RestoreFromComplexVectorArrayType.RowAsVector) {
            let result: ComplexMatrix2D = ComplexMatrix2D.zeros(vectors.length, vectors[0].length);
            for (let i: number = 0; i < result.rows; i++) {
                for (let j: number = 0; j < result.cols; j++) {
                    result.set(i, j, vectors[i].get(j).copy());
                }
            }
            return result;
        } else {
            let result: ComplexMatrix2D = ComplexMatrix2D.zeros(vectors[0].length, vectors.length);
            for (let i: number = 0; i < result.rows; i++) {
                for (let j: number = 0; j < result.cols; j++) {
                    result.set(i, j, vectors[j].get(i).copy());
                }
            }
            return result;
        }
    }
}
