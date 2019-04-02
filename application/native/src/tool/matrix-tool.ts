import { Mat, Vec3 } from 'opencv4nodejs';

export class MatrixTool {
    public static matrixToVector(matrix: Mat): Mat {
        // get matrix size info
        let rows: number = matrix.rows;
        let cols: number = matrix.cols;

        // init output vector
        let vector: Mat = new Mat(1, rows * cols, matrix.type);

        // copy it
        for (let i: number = 0; i < matrix.rows; i++) {
            for (let j: number = 0; j < matrix.cols; j++) {
                vector.set(1, i * cols + j, matrix.at(i, j));
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
                matrix.set(i, j, vector.at(1, i * colsPerRow + j));
            }
        }

        // return result
        return matrix;
    }
}