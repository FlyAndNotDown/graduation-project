import { Mat, CV_8U } from 'opencv4nodejs';
import { MatrixTool } from './../../src/tool/matrix-tool';
import { describe, it } from 'mocha';
import { expect } from 'chai';

describe('MatrixTool', () => {
    let matrix: Mat = new Mat(3, 4, CV_8U);
    for (let i: number = 0; i < matrix.rows; i++) {
        for (let j: number = 0; j < matrix.cols; j++) {
            matrix.set(i, j, i * matrix.cols + j);
        }
    }
    let vector: Mat = undefined;

    describe('data source', () => {
        it('correct', () => {
            expect(matrix.at(0, 0)).to.be.equal(0);
            expect(matrix.at(0, 1)).to.be.equal(1);
            expect(matrix.at(0, 2)).to.be.equal(2);
            expect(matrix.at(0, 3)).to.be.equal(3);
            expect(matrix.at(1, 0)).to.be.equal(4);
            expect(matrix.at(1, 1)).to.be.equal(5);
            expect(matrix.at(1, 2)).to.be.equal(6);
            expect(matrix.at(1, 3)).to.be.equal(7);
            expect(matrix.at(2, 0)).to.be.equal(8);
            expect(matrix.at(2, 1)).to.be.equal(9);
            expect(matrix.at(2, 2)).to.be.equal(10);
            expect(matrix.at(2, 3)).to.be.equal(11);
        });
    });

    describe('static matrixToVector(matrix: Mat): Mat', () => {
        vector = MatrixTool.matrixToVector(matrix);

        it('vector size', () => {
            expect(vector.cols).to.be.equal(matrix.rows * matrix.cols);
        });

        it('vector data', () => {
            for (let i: number = 0; i < matrix.rows; i++) {
                for (let j: number = 0; j < matrix.cols; j++) {
                    expect(vector.at(0, i * matrix.cols + j)).to.be.equal(matrix.at(i, j));
                }
            }
        });
    });

    describe('static vectorToMatrix(vector: Mat, colsPerRow: number): Mat', () => {
        let matrix2: Mat = MatrixTool.vectorToMatrix(vector, 4);
        
        it('vector size', () => {
            expect(matrix2.rows).to.be.equal(matrix.rows);
            expect(matrix2.cols).to.be.equal(matrix.cols);
        });

        it('vector data', () => {
            for (let i: number = 0; i < matrix.rows; i++) {
                for (let j: number = 0; j < matrix.cols; j++) {
                    expect(matrix2.at(i, j)).to.be.equal(matrix.at(i, j));
                }
            }
        });
    });

    describe('static splitToSmallerSquareMatrix(matrix: Mat, smallerMatrixLength: number): Mat[]', () => {
        let source: Mat = new Mat(4, 6, CV_8U);
        for (let i: number = 0; i < source.rows; i++) {
            for (let j: number = 0; j < source.cols; j++) {
                source.set(i, j, i * source.cols + j);
            }
        }
        let smallerMatrixes = MatrixTool.splitToSmallerSquareMatrix(source, 2);

        it('smaller matrix number', () => {
            expect(smallerMatrixes.length).to.be.eq(6);
        });

        it('smaller matrix data', () => {
            // 0  1  2  3  4  5
            // 6  7  8  9  10 11
            // 12 13 14 15 16 17
            // 18 19 20 21 22 23

            // block 0
            expect(smallerMatrixes[0].at(0, 0)).to.be.eq(0);
            expect(smallerMatrixes[0].at(0, 1)).to.be.eq(1);
            expect(smallerMatrixes[0].at(1, 0)).to.be.eq(6);
            expect(smallerMatrixes[0].at(1, 1)).to.be.eq(7);
            // block 1
            expect(smallerMatrixes[1].at(0, 0)).to.be.eq(2);
            expect(smallerMatrixes[1].at(0, 1)).to.be.eq(3);
            expect(smallerMatrixes[1].at(1, 0)).to.be.eq(8);
            expect(smallerMatrixes[1].at(1, 1)).to.be.eq(9);
            // block 2
            expect(smallerMatrixes[2].at(0, 0)).to.be.eq(4);
            expect(smallerMatrixes[2].at(0, 1)).to.be.eq(5);
            expect(smallerMatrixes[2].at(1, 0)).to.be.eq(10);
            expect(smallerMatrixes[2].at(1, 1)).to.be.eq(11);
            // block 3
            expect(smallerMatrixes[3].at(0, 0)).to.be.eq(12);
            expect(smallerMatrixes[3].at(0, 1)).to.be.eq(13);
            expect(smallerMatrixes[3].at(1, 0)).to.be.eq(18);
            expect(smallerMatrixes[3].at(1, 1)).to.be.eq(19);
            // block 4
            expect(smallerMatrixes[4].at(0, 0)).to.be.eq(14);
            expect(smallerMatrixes[4].at(0, 1)).to.be.eq(15);
            expect(smallerMatrixes[4].at(1, 0)).to.be.eq(20);
            expect(smallerMatrixes[4].at(1, 1)).to.be.eq(21);
            // block 5
            expect(smallerMatrixes[5].at(0, 0)).to.be.eq(16);
            expect(smallerMatrixes[5].at(0, 1)).to.be.eq(17);
            expect(smallerMatrixes[5].at(1, 0)).to.be.eq(22);
            expect(smallerMatrixes[5].at(1, 1)).to.be.eq(23);
        });
    });
});