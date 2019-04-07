import { Matrix2D } from './../../src/model/matrix2d';
import { Matrix3D } from './../../src/model/matrix3d';
import { describe, it } from 'mocha';
import { expect } from 'chai';

describe('Matrix3D', () => {
    describe('constructor()', () => {
        let matrix: Matrix3D = new Matrix3D([
            [ [11, 12, 13], [21, 22, 23], [31, 32, 33], [41, 42, 43] ],
            [ [51, 52, 53], [61, 62, 63], [71, 72, 73], [81, 82, 83] ],
            [ [91, 92, 93], [101, 102, 103], [111, 112, 113], [121, 122, 123] ]
        ]);

        it('instance', () => {
            expect(matrix).not.to.be.null;
        });
    });

    describe('zeros() & set() & get()', () => {
        it('data', () => {
            let zeros: Matrix3D = Matrix3D.zeros(3, 4, 3);
            for (let i: number = 0; i < 3; i++) {
                for (let j: number = 0; j < 4; j++) {
                    for (let k: number = 0; k < 3; k++) {
                        expect(zeros.get(i, j, k)).to.be.eq(0);
                    }
                }
            }
            for (let i: number = 0; i < 3; i++) {
                for (let j: number = 0; j < 4; j++) {
                    for (let k: number = 0; k < 3; k++) {
                        zeros.set(i, j, k, (i * 4 + j) * 10 + k);
                    }
                }
            }
            for (let i: number = 0; i < 3; i++) {
                for (let j: number = 0; j < 4; j++) {
                    for (let k: number = 0; k < 3; k++) {
                        expect(zeros.get(i, j, k)).to.be.eq((i * 4 + j) * 10 + k);
                    }
                }
            }
        });
    });

    describe('convertToMatrix2DArray()', () => {
        it('data', () => {
            let matrix: Matrix3D = new Matrix3D([
                [ [11, 12, 13], [21, 22, 23], [31, 32, 33], [41, 42, 43] ],
                [ [51, 52, 53], [61, 62, 63], [71, 72, 73], [81, 82, 83] ],
                [ [91, 92, 93], [101, 102, 103], [111, 112, 113], [121, 122, 123] ]
            ]);
            let matrix2DArray: Matrix2D[] = matrix.convertToMatrix2DArray();

            for (let i: number = 0; i < matrix2DArray.length; i++) {
                for (let j: number = 0; j < matrix2DArray[0].rows; j++) {
                    for (let k: number = 0; k < matrix2DArray[0].cols; k++) {
                        expect(matrix2DArray[i].get(j, k)).to.be.eq(matrix.get(j, k, i));
                    }
                }
            }
        });
    });
});