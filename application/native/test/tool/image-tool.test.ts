import { ImageTool } from './../../src/tool/image-tool';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { Mat, CV_8UC3, CV_64FC3, CV_8U, Vec3, imread, imwrite, IMREAD_COLOR } from 'opencv4nodejs';
import * as Path from 'path';

describe('ImageTool', () => {
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

    describe('static image2Double(image: Mat): Mat', () => {
        let matrix: Mat = new Mat(3, 4, CV_8UC3);
        for (let i: number = 0; i < matrix.rows; i++) {
            for (let j: number = 0; j < matrix.cols; j++) {
                matrix.set(i, j, [i * matrix.cols + j, i * matrix.cols + j, i * matrix.cols + j]);
            }
        }
        let matrixDouble: Mat = ImageTool.image2Double(matrix);

        it('type', () => {
            expect(matrixDouble.type).to.be.eq(CV_64FC3);            
        });

        it('values range', () => {
            for (let i: number = 0; i < matrix.rows; i++) {
                for (let j: number = 0; j < matrix.cols; j++) {
                    let pixel: Vec3 = <Vec3><unknown>matrixDouble.at(i, j);
                    expect(pixel.x >= 0 && pixel.x <= 1).to.be.true;
                    expect(pixel.y >= 0 && pixel.y <= 1).to.be.true;
                    expect(pixel.z >= 0 && pixel.z <= 1).to.be.true;
                }
            }
        });
    });

    let lena: Mat = imread(Path.join('test', 'img', 'lena.bmp'), IMREAD_COLOR);
    let arnold1 = ImageTool.arnoldTransform(lena, 1);
    let arnold2 = ImageTool.arnoldTransform(lena, 2);
    let arnoldRestore1 = ImageTool.inverseArnoldTransform(arnold1, 1);
    let arnoldRestore2 = ImageTool.inverseArnoldTransform(arnold2, 2);

    describe('static arnoldTransform(image: Mat, order: number): Mat', () => {
        it('order 1 transform, result save to /test/dist/arnold-order-1.jpg', () => {
            imwrite(Path.join('test', 'dist', 'arnold-order-1.jpg'), arnold1);
        });

        it('order 2 transform, result save to /test/dist/arnold-order-2.jpg', () => {
            imwrite(Path.join('test', 'dist', 'arnold-order-2.jpg'), arnold2);
        });
    });

    describe('static inverseArnoldTransform(image: Mat, order: number): Mat', () => {
        it('order 1 inverse transform, result save to /test/dist/inverse-arnold-order-1.jpg', () => {
            imwrite(Path.join('test', 'dist', 'inverse-arnold-order-1.jpg'), arnoldRestore1);
        });

        it('order 2 inverse transform, result save to /test/dist/inverse-arnold-order-2.jpg', () => {
            let lena: Mat = imread(Path.join('test', 'img', 'lena.bmp'), IMREAD_COLOR);
            imwrite(Path.join('test', 'dist', 'inverse-arnold-order-2.jpg'), arnoldRestore2);
        });
    });

    describe('static matrixToVector(matrix: Mat): Mat', () => {
        vector = ImageTool.matrixToVector(matrix);

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
        let matrix2: Mat = ImageTool.vectorToMatrix(vector, 4);
        
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

    let matrix3: Mat = new Mat(4, 6, CV_8U);
    for (let i: number = 0; i < matrix3.rows; i++) {
        for (let j: number = 0; j < matrix3.cols; j++) {
            matrix3.set(i, j, i * matrix3.cols + j);
        }
    }
    let smallerMatrixes = ImageTool.splitToSmallerSquareMatrix(matrix3, 2);

    describe('static splitToSmallerSquareMatrix(matrix: Mat, smallerMatrixLength: number): Mat[]', () => {
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

    describe('static mergeToBiggerMatrix(matrixes: Mat[], matrixPerRow: number): Mat', () => {
        let matrix4 = ImageTool.mergeToBiggerMatrix(smallerMatrixes, 3);        
        
        it('bigger matrix size', () => {
            expect(matrix4.rows).to.be.eq(4);
            expect(matrix4.cols).to.be.eq(6);
        });

        it('bigger matrix data', () => {
            expect(matrix4.at(0, 0)).to.be.eq(0);
            expect(matrix4.at(0, 1)).to.be.eq(1);
            expect(matrix4.at(0, 2)).to.be.eq(2);
            expect(matrix4.at(0, 3)).to.be.eq(3);
            expect(matrix4.at(0, 4)).to.be.eq(4);
            expect(matrix4.at(0, 5)).to.be.eq(5);
            expect(matrix4.at(1, 0)).to.be.eq(6);
            expect(matrix4.at(1, 1)).to.be.eq(7);
            expect(matrix4.at(1, 2)).to.be.eq(8);
            expect(matrix4.at(1, 3)).to.be.eq(9);
            expect(matrix4.at(1, 4)).to.be.eq(10);
            expect(matrix4.at(1, 5)).to.be.eq(11);
            expect(matrix4.at(2, 0)).to.be.eq(12);
            expect(matrix4.at(2, 1)).to.be.eq(13);
            expect(matrix4.at(2, 2)).to.be.eq(14);
            expect(matrix4.at(2, 3)).to.be.eq(15);
            expect(matrix4.at(2, 4)).to.be.eq(16);
            expect(matrix4.at(2, 5)).to.be.eq(17);
            expect(matrix4.at(3, 0)).to.be.eq(18);
            expect(matrix4.at(3, 1)).to.be.eq(19);
            expect(matrix4.at(3, 2)).to.be.eq(20);
            expect(matrix4.at(3, 3)).to.be.eq(21);
            expect(matrix4.at(3, 4)).to.be.eq(22);
            expect(matrix4.at(3, 5)).to.be.eq(23);
        });
    });
});