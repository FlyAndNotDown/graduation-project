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

    describe('add()', () => {
        it('data', () => {
            let matrix1: Matrix2D = new Matrix2D([
                [1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 10, 11, 12]
            ]);
            let matrix2: Matrix2D = new Matrix2D([
                [2, 3, 4, 5],
                [6, 7, 8, 9],
                [10, 11, 12, 13]
            ]);
            let correct: Matrix2D = new Matrix2D([
                [3, 5, 7, 9],
                [11, 13, 15, 17],
                [19, 21, 23, 25]
            ]);
            let result: Matrix2D = matrix1.add(matrix2);
            for (let i: number = 0; i < result.rows; i++) {
                for (let j: number = 0; j < result.cols; j++) {
                    expect(result.get(i, j)).to.be.eq(correct.get(i, j));
                }
            }
        });
    });

    describe('mul()', () => {
        it('data', () => {
            let matrix1: Matrix2D = new Matrix2D([
                [1, 2, 3]
            ]);
            let matrix2: Matrix2D = new Matrix2D([
                [4],
                [5],
                [6]
            ]);
            let correct: Matrix2D = new Matrix2D([
                [32]
            ]);
            let result: Matrix2D = matrix1.mul(matrix2);
            for (let i: number = 0; i < result.rows; i++) {
                for (let j: number = 0; j < result.cols; j++) {
                    expect(result.get(i, j)).to.be.eq(correct.get(i, j));
                }
            }

            matrix1 = new Matrix2D([
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 0]
            ]);
            matrix2 = new Matrix2D([
                [1, 2, 1],
                [1, 1, 2],
                [2, 1, 1]
            ]);
            correct = new Matrix2D([
                [9, 7, 8],
                [21, 19, 20],
                [15, 22, 23]
            ]);
            result = matrix1.mul(matrix2);
            for (let i: number = 0; i < result.rows; i++) {
                for (let j: number = 0; j < result.cols; j++) {
                    expect(result.get(i, j)).to.be.eq(correct.get(i, j));
                }
            }
        });
    });

    describe('div()', () => {
        it('data', () => {
            let source: Matrix2D = new Matrix2D([
                [2, 4, 6],
                [8, 10, 12],
                [14, 16, 18]
            ]);
            let result: Matrix2D = source.div(2);
    
            for (let i = 0; i < result.rows; i++) {
                for (let j = 0; j < result.cols; j++) {
                    expect(result.get(i, j)).to.be.eq(source.get(i, j) / 2);
                }
            }
        });
    });

    describe('transport()', () => {
        it('data', () => {
            let source: Matrix2D = new Matrix2D([
                [1, 2, 3],
                [4, 5, 6]
            ]);
            let correct: Matrix2D = new Matrix2D([
                [1, 4],
                [2, 5],
                [3, 6]
            ]);
            let result: Matrix2D = source.transport();
    
            for (let i: number = 0; i < result.rows; i++) {
                for (let j: number = 0; j < result.cols; j++) {
                    expect(result.get(i, j)).to.be.eq(correct.get(i, j));
                }
            }
        });
    });
});