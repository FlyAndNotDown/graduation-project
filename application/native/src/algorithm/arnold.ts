import { MatrixTool } from './../tool/matrix';

export class Arnold {
    public static transform(matrix: number[][][], order: number): number[][][] {
        // get size info
        let rows: number = matrix.length;
        let cols: number = matrix[0].length;

        // judge if rows & cols is equal
        if (rows !== cols) throw new Error('rows & cols of matrix should be equal');

        // init output
        let source: number[][][] = matrix;
        let result: number[][][] = MatrixTool.deepCopy(source);

        // judge if it's normal transform or inverse transform
        if (order > 0) {
            // do arnold transform to matrix
            for (let i: number = 0; i < order; i++) {
                for (let j: number = 0; j < rows; j++) {
                    for (let k: number = 0; k < rows; k++) {
                        let x: number = (j + k) % rows;
                        let y: number = (j + 2 * k) % rows;
                        result[y][x] = source[k][j];
                    }
                }
                if (i !== order - 1) { source = MatrixTool.deepCopy(result); }
            }
        } else if (order < 0) {
            // do inverse arnold transform to matrix
            let inverseOrder: number = 0 - order;
            for (let i: number = 0; i < inverseOrder; i++) {
                for (let j: number = 0; j < rows; j++) {
                    for (let k: number = 0; k < rows; k++) {
                        let x: number = (2 * j - k) % rows;
                        let y: number = (k - j) % rows;
                        result[y][x] = source[k][j];
                    }
                }
                if (i !== inverseOrder - 1) { source = MatrixTool.deepCopy(result); }
            }
        }

        // return result
        return result;
    }

    public static inverseTransform(matrix: number[][][], order: number): number[][][] {
        // return result
        return Arnold.transform(matrix, 0 - order);
    }
}