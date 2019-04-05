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

        // init result
        let biggerMatrix: number[][][] = [];

        // copy
        for (let i: number = 0; i < length; i++) {
            for (let j: number = 0; j < rows; j++) {
                let rowIndex: number = Math.floor(i / matrixesPerRow) * rows + j;
                if (rowIndex <= biggerMatrix.length) { biggerMatrix.push([]); }
                for (let k: number = 0; k < cols; k++) {
                    let colIndex: number = (i % matrixesPerRow) * cols + k;
                    if (colIndex <= biggerMatrix[rowIndex].length) { biggerMatrix[rowIndex].push([]); }
                    let pixel: number[] = matrixes[i][j][k];
                    biggerMatrix[rowIndex][colIndex].push(pixel[0], pixel[1], pixel[2]);
                }
            }
        }

        // return result
        return biggerMatrix;
    }
}