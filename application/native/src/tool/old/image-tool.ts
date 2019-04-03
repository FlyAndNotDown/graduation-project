import { MathTool } from './math-tool';
import { Mat, CV_64FC3 } from 'opencv4nodejs';

export class ImageTool {
    public static image2Double(image: Mat): Mat {
        // convert it
        return image.convertTo(CV_64FC3, 1 / 255);
    }

    public static arnoldTransform(image: Mat, order: number): Mat {
        // get size info
        let rows: number = image.rows;

        // init output
        let output: Mat = image.copy();

        // do arnold transform
        for (let i = 0; i < order; i++) {
            let temp: Mat = output.copy();
            for (let j = 0; j < rows; j++) {
                for (let k = 0; k < rows; k++) {
                    let x: number = MathTool.mod(j + k, rows);
                    let y: number = MathTool.mod(j + 2 * k, rows);
                    output.set(y, x, temp.at(k, j));
                }
            }
            temp = output.copy();
        }

        // return result
        return output;
    }

    public static inverseArnoldTransform(image: Mat, order: number): Mat {
        // get size info
        let rows: number = image.rows;

        // init output
        let output: Mat = image.copy();

        // do inverse arnold transform
        for (let i = 0; i < order; i++) {
            let temp: Mat = output.copy();
            for (let j = 0; j < rows; j++) {
                for (let k = 0; k < rows; k++) {
                    let x: number = MathTool.mod(2 * j - k, rows);
                    let y: number = MathTool.mod(k - j, rows);
                    output.set(y, x, temp.at(k, j));
                }
            }
            temp = output.copy();
        }

        // return result
        return output;
    }

    public static matrixToVector(matrix: Mat): Mat {
        // get matrix size info
        let rows: number = matrix.rows;
        let cols: number = matrix.cols;

        // init output vector
        let vector: Mat = new Mat(1, rows * cols, matrix.type);

        // copy it
        for (let i: number = 0; i < matrix.rows; i++) {
            for (let j: number = 0; j < matrix.cols; j++) {
                vector.set(0, i * cols + j, matrix.at(i, j));
            }
        }
        
        // render result
        return vector;
    }

    public static vectorToMatrix(vector: Mat, colsPerRow: number): Mat {
        // get vector size info
        let cols: number = vector.cols;

        // init output matrix
        let matrixRows = Math.floor(cols / colsPerRow)
        let matrix: Mat = new Mat(matrixRows, colsPerRow, vector.type);

        // copy it
        for (let i: number = 0; i < matrixRows; i++) {
            for (let j: number = 0; j < colsPerRow; j++) {
                matrix.set(i, j, vector.at(0, i * colsPerRow + j));
            }
        }

        // return result
        return matrix;
    }

    public static splitToSmallerSquareMatrix(matrix: Mat, smallerMatrixLength: number): Mat[] {
        // get size info
        let rows: number = matrix.rows;
        let cols: number = matrix.cols;

        // calculate smaller matrix number
        let smallerMatrixPerRow: number = Math.floor(cols / smallerMatrixLength);
        let smallerMatrixPerCol: number = Math.floor(rows / smallerMatrixLength);

        // init result array
        let smallerMatrixes: Mat[] = new Array();

        // copy
        for (let i = 0; i < smallerMatrixPerCol; i++) {
            for (let j = 0; j < smallerMatrixPerRow; j++) {
                let tempMatrix: Mat = new Mat(smallerMatrixLength, smallerMatrixLength, matrix.type);
                for (let m = 0; m < smallerMatrixLength; m++) {
                    for (let n = 0; n < smallerMatrixLength; n++) {
                        tempMatrix.set(m, n, matrix.at(i * smallerMatrixLength + m, j * smallerMatrixLength + n));
                    }
                }
                smallerMatrixes.push(tempMatrix);
            }
        }

        // render result
        return smallerMatrixes;
    }

    public static mergeToBiggerMatrix(matrixes: Mat[], matrixPerRow: number): Mat {
        // get size info
        let matrixesLength: number = matrixes.length;
        let matrixRows: number = matrixes[0].rows;
        let matrixCols: number = matrixes[0].cols;

        // get type
        let matrixType: number = matrixes[0].type;

        // calculate output matrix length
        let matrixPerCol: number = Math.floor(matrixesLength / matrixPerRow);
        let biggerMatrixRow: number = matrixRows * matrixPerCol;
        let biggerMatrixCol: number = matrixCols * matrixPerRow;

        // init output matrix
        let biggerMatrix: Mat = new Mat(biggerMatrixRow, biggerMatrixCol, matrixType);

        // copy
        for (let i: number = 0; i < matrixesLength; i++) {
            for (let j: number = 0; j < matrixRows; j++) {
                for (let k: number = 0; k < matrixCols; k++) {
                    let row: number = Math.floor(i / matrixPerRow);
                    let col: number = i - row * matrixPerRow;
                    biggerMatrix.set(row * matrixRows + j, col * matrixCols + k, matrixes[i].at(j, k));
                }
            }
        }

        // render it
        return biggerMatrix;
    }
}