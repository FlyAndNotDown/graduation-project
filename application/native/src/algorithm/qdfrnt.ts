import { Matrix2D } from './../model/matrix2d';
import { MatrixTool } from './../tool/matrix';

export class QDFRNT {
    public static kernel(order: number, cycle: number, random: Matrix2D) {
        // get size info
        let rows: number = random.rows;

        // get the random symmetrical matrix
        let symMatrix: Matrix2D = random.add(random.transport()).div(2);

        // get the random eigen matrix
        let eigMatrix: Matrix2D = symMatrix.eigenVectors();
        // TODO
    }
}