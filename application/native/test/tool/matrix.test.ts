import { expect } from 'chai';
import { MatrixTool } from './../../src/tool/matrix';
import { describe, it } from 'mocha';

describe('MatrixTool', () => {
    let matrix: number[][][] = [
        [ [1, 1, 1], [2, 2, 2], [3, 3, 3] ],
        [ [4, 4, 4], [5, 5, 5], [6, 6, 6] ]
    ];
    let vector: number[][] = MatrixTool.convertToVector(matrix);
    let restore: number[][][] = MatrixTool.convertToMatrix(vector, 3);

    describe('convertToVector()', () => {
        it('data size', () => {
            let length: number = vector.length;
            expect(length).to.be.eq(6);
        });

        it('data', () => {
            let length: number = vector.length;
            for (let i: number = 0; i < length; i++) {
                expect(vector[i][0]).to.be.eq(i + 1);
                expect(vector[i][1]).to.be.eq(i + 1);
                expect(vector[i][2]).to.be.eq(i + 1);
            }
        });
    });

    describe('convertToMatrix', () => {
        it('data size', () => {
            let rows: number = restore.length;
            let cols: number = restore[0].length;
            let channels: number = restore[0][0].length;
            expect(rows).to.be.eq(2);
            expect(cols).to.be.eq(3);
            expect(channels).to.be.eq(3);
        });

        it('data', () => {
            for (let i: number = 0; i < 2; i++) {
                for (let j: number = 0; j < 3; j++) {
                    for (let k: number = 0; k < 3; k++) {
                        expect(restore[i][j][k]).to.be.eq(matrix[i][j][k]);
                    }
                }
            }
        });
    });
});