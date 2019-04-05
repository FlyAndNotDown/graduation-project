export class MatrixTool {
    public static convertToVector(matrix: number[][][]): number[][] {
        // get size info
        let rows: number = matrix.length;
        let cols: number = matrix[0].length;

        // init vector
        let vector: number[][] = [];

        // copy
        for (let i: number = 0; i < rows; i++) {
            for (let j: number = 0; j < cols; j++) {
                let pixel: number[] = matrix[i][j];
                vector.push([pixel[0], pixel[1], pixel[2]]);
            }
        }

        // return vector
        return vector;
    }

    public static convertToMatrix(vector: number[][], colsPerRow: number): number[][][] {
        // get size info
        let length: number = vector.length;

        // init matrix
        let matrix: number[][][] = [];

        // copy
        for (let i: number = 0; i < length; i++) {
            if (i % colsPerRow === 0) {
                matrix.push([]);
            }
            let pixel: number[] = vector[i];
            matrix[Math.floor(i / colsPerRow)].push([pixel[0], pixel[1], pixel[2]]);
        }

        // return result
        return matrix;
    }

    public static splitToSmallerMatrix(matrix: number[][][], smallerMatrixLength: number): number[][][][] {
        // get size info
        let rows: number = matrix.length;
        let cols: number = matrix[0].length;

        // get smaller matrix num
        let smallerMatrixesPerRow: number = Math.floor(cols / smallerMatrixLength);
        let smallerMatrixesPerCol: number = Math.floor(rows / smallerMatrixLength);

        // init result
        let smallerMatrixes: number[][][][] = [];

        // copy
        for (let i: number = 0; i < smallerMatrixesPerCol; i++) {
            for (let j: number = 0; j < smallerMatrixesPerRow; j++) {
                let smallerMatrix: number[][][] = [];
                for (let m: number = 0; m < smallerMatrixLength; m++) {
                    let smallerMatrixRow: number[][] = [];
                    for (let n: number = 0; n < smallerMatrixLength; n++) {
                        let pixel: number[] = matrix[i * smallerMatrixLength + m][j * smallerMatrixLength + n];
                        smallerMatrixRow.push([
                            pixel[0], pixel[1], pixel[2]
                        ]);
                    }
                    smallerMatrix.push(smallerMatrixRow);
                }
                smallerMatrixes.push(smallerMatrix);
            }
        }
        
        // return result
        return smallerMatrixes;
    }

    public static mergeToBiggerMatrix(matrixes: number[][][][], matrixesPerRow: number): number[][][] {
        // get size info
        let length: number = matrixes.length;
        let rows: number = matrixes[0].length;
        let cols: number = matrixes[0][0].length;

        // get bigger matrix size
        let matrixesPerCol: number = Math.floor(length / matrixesPerRow);
        let biggerMatrixRows: number = rows * matrixesPerCol;
        let biggerMatrixCols: number = cols * matrixesPerRow;

        // TODO
        return null;
    }
}