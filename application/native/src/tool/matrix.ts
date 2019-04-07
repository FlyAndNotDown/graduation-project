import { Matrix2D } from './../model/matrix2d';
import { Matrix3D } from './../model/matrix3d';

export class MatrixTool {
    public static splitToSmallerMatrix(matrix: Matrix3D, smallerMatrixLength: number): Matrix3D[] {
        // get size info
        let rows: number = matrix.rows;
        let cols: number = matrix.cols;

        // get smaller matrix num
        let smallerMatrixesPerRow: number = Math.floor(cols / smallerMatrixLength);
        let smallerMatrixesPerCol: number = Math.floor(rows / smallerMatrixLength);

        // init result
        let smallerMatrixes: Matrix3D[] = [];

        // copy
        for (let i: number = 0; i < smallerMatrixesPerCol; i++) {
            for (let j: number = 0; j < smallerMatrixesPerRow; j++) {
                let smallerMatrix: number[][][] = [];
                for (let m: number = 0; m < smallerMatrixLength; m++) {
                    let smallerMatrixRow: number[][] = [];
                    for (let n: number = 0; n < smallerMatrixLength; n++) {
                        smallerMatrixRow.push([
                            matrix.get(i * smallerMatrixLength + m, j * smallerMatrixLength + n, 0),
                            matrix.get(i * smallerMatrixLength + m, j * smallerMatrixLength + n, 1),
                            matrix.get(i * smallerMatrixLength + m, j * smallerMatrixLength + n, 2)
                        ]);
                    }
                    smallerMatrix.push(smallerMatrixRow);
                }
                smallerMatrixes.push(new Matrix3D(smallerMatrix));
            }
        }
        
        // return result
        return smallerMatrixes;
    }

    public static mergeToBiggerMatrix(matrixes: Matrix3D[], matrixesPerRow: number): Matrix3D {
        // get size info
        let length: number = matrixes.length;
        let rows: number = matrixes[0].rows;
        let cols: number = matrixes[0].cols;

        // init result
        let biggerMatrix: number[][][] = [];

        // copy
        for (let i: number = 0; i < length; i++) {
            for (let j: number = 0; j < rows; j++) {
                let rowIndex: number = Math.floor(i / matrixesPerRow) * rows + j;
                if (rowIndex >= biggerMatrix.length) { biggerMatrix.push([]); }
                for (let k: number = 0; k < cols; k++) {
                    let colIndex: number = (i % matrixesPerRow) * cols + k;
                    if (colIndex >= biggerMatrix[rowIndex].length) { biggerMatrix[rowIndex].push([]); }
                    biggerMatrix[rowIndex][colIndex].push(
                        matrixes[i].get(j, k, 0),
                        matrixes[i].get(j, k, 1),
                        matrixes[i].get(j, k, 2)
                    );
                }
            }
        }

        // return result
        return new Matrix3D(biggerMatrix);
    }

    public static deepCopy(matrix: Matrix3D): Matrix3D {
        // init result
        let result: number[][][] = [];
        let rows: number = matrix.rows;
        let cols: number = matrix.cols;

        // copy
        for (let i: number = 0; i < rows; i++) {
            let row: number[][] = [];
            for (let j: number = 0; j < cols; j++) {
                row.push([
                    matrix.get(i, j, 0),
                    matrix.get(i, j, 1),
                    matrix.get(i, j, 2)
                ]);
            }
            result.push(row);
        }

        // return result
        return new Matrix3D(result);
    }

    public static getRandomSquareMatrix(length: number): Matrix2D {
        let result: Matrix2D = Matrix2D.zeros(length, length);
        for (let i: number = 0; i < result.rows; i++) {
            for (let j: number = 0; j < result.cols; j++) {
                result.set(i, j, Math.random());
            }
        }
        return result;
    }
}