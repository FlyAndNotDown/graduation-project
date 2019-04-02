import { Mat, CV_8U } from 'opencv4nodejs';
import { MatrixTool } from './../../src/tool/matrix-tool';
import { describe, it } from 'mocha';
import { expect } from 'chai';

describe('MatrixTool', () => {
    let matrix: Mat = new Mat(3, 4, CV_8U);
    for (let i: number = 0; i < matrix.rows; i++) {
        for (let j: number = 0; j < matrix.cols; j++) {
            matrix.set(i, j, i * 4 + j);
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
});