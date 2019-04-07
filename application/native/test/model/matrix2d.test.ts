import { Matrix2D } from './../../src/model/matrix2d';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { Vector } from '../../src/model/vector';

describe('Matrix2D', () => {
    let matrix: Matrix2D = new Matrix2D([
        [1, 2, 3],
        [4, 5, 6]
    ]);
    let zeros: Matrix2D = Matrix2D.zeros(2, 3);
    let data: number[][] = matrix.getData();

    describe('constructor', () => {
        it('instance', () => {
            expect(matrix).not.to.be.null;
        });
    });
    
    describe('zeros() & get()', () => {
        it('data', () => {
            for (let i: number = 0; i < zeros.rows; i++) {
                for (let j: number = 0; j < zeros.cols; j++) {
                    expect(zeros.get(i, j)).to.be.eq(0);
                }
            }
        });
    });

    describe('diagonal()', () => {
        it('data', () => {
            let diagonal: Matrix2D = Matrix2D.diagonal(new Vector([1, 2, 3, 4]));
            let correct: Matrix2D = new Matrix2D([
                [1, 0, 0, 0],
                [0, 2, 0, 0],
                [0, 0, 3, 0],
                [0, 0, 0, 4]
            ]);
            for (let i: number = 0; i < diagonal.rows; i++) {
                for (let j: number = 0; j < diagonal.cols; j++) {
                    expect(diagonal.get(i, j)).to.be.eq(correct.get(i, j));
                }
            }
        });
    });

    describe('set()', () => {
        it('simple test', () => {
            let zeros2: Matrix2D = Matrix2D.zeros(2, 3);
            for (let i: number = 0; i < zeros2.rows; i++) {
                for (let j: number = 0; j < zeros2.cols; j++) {
                    zeros2.set(i, j, 1);
                }
            }
            for (let i: number = 0; i < zeros2.rows; i++) {
                for (let j: number = 0; j < zeros2.cols; j++) {
                    expect(zeros2.get(i, j)).to.be.eq(1);
                }
            }
        });
    });

    describe('getData()', () => {
        it('data', () => {
            let rows: number = data.length;
            let cols: number = data[0].length;
            for (let i: number = 0; i < rows; i++) {
                for (let j: number = 0; j < cols; j++) {
                    expect(data[i][j]).to.be.eq(i * 3 + j + 1);
                }
            }
        });
    });
});