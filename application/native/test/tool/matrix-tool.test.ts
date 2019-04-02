import { Mat, CV_8U } from 'opencv4nodejs';
import { MatrixTool } from './../../src/tool/matrix-tool';
import { describe, it } from 'mocha';
import { expect } from 'chai';

describe('MatrixTool', () => {
    describe('static matrixToVector(matrix: Mat): Mat', () => {
        it('vector size', () => {
            let matrix: Mat = new Mat(3, 4, CV_8U);
            for (let i = 0; i < matrix.rows; i++) {
                for (let j = 0; j < matrix.cols; j++) {
                    matrix.set(i, j, i * 4 + j);
                }
            }
            let vector: Mat = MatrixTool.matrixToVector(matrix);
            for (let i = 0; i < matrix.rows; i++) {
                for (let j = 0; j < matrix.cols; j++) {
                    expect(vector.at(1, i * matrix.cols + j)).to.be.equal(matrix.at(i, j));
                }
            }
        });
    });
});