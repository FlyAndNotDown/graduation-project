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

    let matrix2: number[][][] = [
        [ [11, 12, 13], [21, 22, 23], [31, 32, 33], [41, 42, 43], [51, 52, 53], [61, 62, 63] ],
        [ [71, 72, 73], [81, 82, 83], [91, 92, 93], [101, 102, 103], [111, 112, 113], [121, 122, 123] ],
        [ [131, 132, 133], [141, 142, 143], [151, 152, 153], [161, 162, 163], [171, 172, 173], [181, 182, 183] ],
        [ [191, 192, 193], [201, 202, 203], [211, 212, 213], [221, 222, 223], [231, 232, 233], [241, 242, 243] ]
    ];
    let smallerMatrixes2: number[][][][] = MatrixTool.splitToSmallerMatrix(matrix2, 2);
    // let restore2: number[][][] = MatrixTool.mergeToBiggerMatrix(smallerMatrix2, 3);

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

    describe('convertToMatrix()', () => {
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

    describe('splitToSmallerMatrix()', () => {
        it('data size', () => {
            let length: number = smallerMatrixes2.length;
            expect(length).to.be.eq(6);
            for (let i: number = 0; i < length; i++) {
                let rows: number = smallerMatrixes2[i].length;
                expect(rows).to.be.eq(2);
                for (let j: number = 0; j < rows; j++) {
                    let cols: number = smallerMatrixes2[i][j].length;
                    expect(cols).to.be.eq(2);
                }
            }
        });

        it('data', () => {
            let length: number = smallerMatrixes2.length;
            for (let i: number = 0; i < 6; i++) {
                for (let j: number = 0; j < 2; j++) {
                    for (let k: number = 0; k < 2; k++) {
                        for (let l: number = 0; l < 3; l++) {
                            let row: number = Math.floor(i / 3) * 2 + j;
                            let col: number = i % 3 * 2 + k;

                            expect(smallerMatrixes2[i][j][k][l]).to.be.eq(
                                (row * 6 + col + 1) * 10 + l + 1
                            );
                        }
                    }
                }
            }
        });
    });

    describe('mergeToBiggerMatrix()', () => {
        // TODO
    });
});