import { Matrix2D } from './../../src/model/matrix2d';
import { Matrix3D } from './../../src/model/matrix3d';
import { expect } from 'chai';
import { MatrixTool } from './../../src/tool/matrix';
import { describe, it } from 'mocha';

describe('MatrixTool', () => {
    let matrix: Matrix3D = new Matrix3D([
        [ [1, 1, 1], [2, 2, 2], [3, 3, 3] ],
        [ [4, 4, 4], [5, 5, 5], [6, 6, 6] ]
    ]);

    let matrix2: Matrix3D = new Matrix3D([
        [ [11, 12, 13], [21, 22, 23], [31, 32, 33], [41, 42, 43], [51, 52, 53], [61, 62, 63] ],
        [ [71, 72, 73], [81, 82, 83], [91, 92, 93], [101, 102, 103], [111, 112, 113], [121, 122, 123] ],
        [ [131, 132, 133], [141, 142, 143], [151, 152, 153], [161, 162, 163], [171, 172, 173], [181, 182, 183] ],
        [ [191, 192, 193], [201, 202, 203], [211, 212, 213], [221, 222, 223], [231, 232, 233], [241, 242, 243] ]
    ]);
    let smallerMatrixes2: Matrix3D[] = MatrixTool.splitToSmallerMatrix(matrix2, 2);
    let restore2: Matrix3D = MatrixTool.mergeToBiggerMatrix(smallerMatrixes2, 3);

    // let matrixCopy: Matrix3D = MatrixTool.deepCopy(matrix);

    describe('splitToSmallerMatrix()', () => {
        it('data size', () => {
            let length: number = smallerMatrixes2.length;
            expect(length).to.be.eq(6);
            for (let i: number = 0; i < length; i++) {
                let rows: number = smallerMatrixes2[i].rows;
                let cols: number = smallerMatrixes2[i].cols;
                expect(rows).to.be.eq(2);
                expect(cols).to.be.eq(2);
            }
        });

        it('data', () => {
            for (let i: number = 0; i < 6; i++) {
                for (let j: number = 0; j < 2; j++) {
                    for (let k: number = 0; k < 2; k++) {
                        for (let l: number = 0; l < 3; l++) {
                            let row: number = Math.floor(i / 3) * 2 + j;
                            let col: number = i % 3 * 2 + k;
                            expect(smallerMatrixes2[i].get(j, k, l)).to.be.eq(
                                (row * 6 + col + 1) * 10 + l + 1
                            );
                        }
                    }
                }
            }
        });
    });

    describe('mergeToBiggerMatrix()', () => {
        it('data size', () => {
            expect(restore2.rows).to.be.eq(4);
            expect(restore2.cols).to.be.eq(6);
            expect(restore2.channels).to.be.eq(3);
        });

        it('data', () => {
            for (let i: number = 0; i < restore2.rows; i++) {
                for (let j: number = 0; j < restore2.cols; j++) {
                    for (let k: number = 0; k < restore2.channels; k++) {
                        expect(restore2.get(i, j, k)).to.be.eq(matrix2.get(i, j, k));
                    }
                }
            }
        });
    });

    // describe('deepCopy()', () => {
    //     it('point', () => {
    //         expect(matrixCopy === matrix).to.be.false;
    //     });

    //     it('data size', () => {
    //         expect(matrixCopy.rows).to.be.eq(matrix.rows);
    //         expect(matrixCopy.cols).to.be.eq(matrix.cols);
    //         expect(matrixCopy.channels).to.be.eq(matrix.channels);
    //     });

    //     it('data', () => {
    //         for (let i: number = 0; i < matrixCopy.rows; i++) {
    //             for (let j: number = 0; j < matrixCopy.cols; j++) {
    //                 for (let k: number = 0; k < matrixCopy.channels; k++) {
    //                     expect(matrixCopy.get(i, j, k)).to.be.eq(matrix.get(i, j, k));
    //                 }
    //             }
    //         }
    //     });
    // });

    describe('getRandomSquareMatrix()', () => {
        let random: Matrix2D = MatrixTool.getRandomSquareMatrix(4);
        
        it('data size', () => {
            expect(random.rows).to.be.eq(4);
            expect(random.cols).to.be.eq(4);
        });

        it('data range', () => {
            for (let i: number = 0; i < random.rows; i++) {
                for (let j: number = 0; j < random.cols; j++) {
                    expect(random.get(i, j) >= 0 && random.get(i, j) <= 1).to.be.true;
                }
            }
        });
    });
});