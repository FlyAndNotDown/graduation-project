import { ImageTool } from './../../src/tool/image-tool';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { Mat, CV_8UC3, CV_64FC3, Vec3, Vec } from 'opencv4nodejs';

describe('ImageTool', () => {
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
});