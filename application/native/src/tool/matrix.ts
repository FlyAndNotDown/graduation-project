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

    public static convertToMatrix(vector: number[][]): number[][][] {
        // get size info
        let length: number = vector.length;

        // TODO
        return null;
    }
}