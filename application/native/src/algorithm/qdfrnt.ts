import { MatrixTool } from './../tool/matrix';

export class QDFRNT {
    public static kernel(order: number, cycle: number, randomMatrix: number[][]): number[][] {
        // get size info
        let rows: number = randomMatrix.length;
        let cols: number = randomMatrix[0].length;
        if (rows !== cols) { throw new Error('rows & cols of random matrix should be equal'); }

        // get symmetrical matrix
        let randomMatrixTransport: number[][] = MatrixTool.transport(randomMatrix);
        let randomMatrixTransportRows: number = randomMatrixTransport.length;
        let randomMatrixTransportCols: number = randomMatrixTransport[0].length;
        if (randomMatrixTransportRows !== randomMatrixTransportCols) {
            throw new Error('rows & cols of random matrix\'s transport should be equal');
        }
        if (randomMatrixTransportRows !== rows) {
            throw new Error('rows of random matrix and it\'s transport should be equal');
        }
        // TODO

        return null;
    }
}