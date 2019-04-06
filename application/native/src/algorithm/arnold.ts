import { Matrix3D } from './../model/matrix3d';
import { MathTool } from './../tool/math';
import { MatrixTool } from './../tool/matrix';

export class Arnold {
    public static transform(matrix: Matrix3D, order: number): Matrix3D {
        // get size info
        let rows: number = matrix.rows;
        let cols: number = matrix.cols;

        // judge if rows & cols is equal
        if (rows !== cols) throw new Error('rows & cols of matrix should be equal');

        // init output
        let source: Matrix3D = matrix;
        let result: Matrix3D = MatrixTool.deepCopy(source);

        // judge if it's normal transform or inverse transform
        if (order > 0) {
            // do arnold transform to matrix
            for (let i: number = 0; i < order; i++) {
                for (let j: number = 0; j < rows; j++) {
                    for (let k: number = 0; k < rows; k++) {
                        // let x: number = (j + k) % rows;
                        // let y: number = (j + 2 * k) % rows;
                        let x: number = MathTool.mod(j + k, rows);
                        let y: number = MathTool.mod(j + 2 * k, rows);
                        result.set(y, x, 0, source.get(k, j, 0));
                        result.set(y, x, 1, source.get(k, j, 1));
                        result.set(y, x, 2, source.get(k, j, 2));
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
                        // let x: number = (2 * j - k) % rows;
                        // let y: number = (k - j) % rows;
                        let x: number = MathTool.mod(2 * j - k, rows);
                        let y: number = MathTool.mod(k - j, rows);
                        result.set(y, x, 0, source.get(k, j, 0));
                        result.set(y, x, 1, source.get(k, j, 1));
                        result.set(y, x, 2, source.get(k, j, 2));
                    }
                }
                if (i !== inverseOrder - 1) { source = MatrixTool.deepCopy(result); }
            }
        }

        // return result
        return result;
    }

    public static inverseTransform(matrix: Matrix3D, order: number): Matrix3D {
        // return result
        return Arnold.transform(matrix, 0 - order);
    }
}