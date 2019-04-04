import { ImageTool } from './../../src/tool/image';
import { Mat, CV_8UC3, Vec3 } from 'opencv4nodejs';
import { describe, it } from 'mocha';
import { expect } from 'chai';

describe('ImageTool', () => {
    let image: Mat = new Mat(3, 4, CV_8UC3);
    for (let i: number; i < image.rows; i++) {
        for (let j: number; j < image.cols; j++) {
            let temp: number = i * image.cols + j;
            image.set(i, j, new Vec3(temp, temp, temp));
        }
    }

    let imageDouble: Mat = ImageTool.imageToDouble(image);
    let imageUint: Mat = ImageTool.imageToUint(image);

    describe('data source', () => {
        it('correct', () => {
            for (let i: number; i < image.rows; i++) {
                for (let j: number; j < image.cols; j++) {
                    let pixel: Vec3 = <Vec3><unknown>image.at(i, j);
                    expect(pixel.x).to.be.eq(i * image.cols + j);
                    expect(pixel.y).to.be.eq(i * image.cols + j);
                    expect(pixel.z).to.be.eq(i * image.cols + j);
                }
            }
        });
    });

    describe('imageToDouble()', () => {
        it('data range', () => {
            for (let i: number; i < imageDouble.rows; i++) {
                for (let j: number; j < imageDouble.cols; j++) {
                    let pixel: Vec3 = <Vec3><unknown>imageDouble.at(i, j);
                    expect(pixel.x >= 0 && pixel.x <= 1).to.be.true;
                    expect(pixel.y >= 0 && pixel.y <= 1).to.be.true;
                    expect(pixel.z >= 0 && pixel.z <= 1).to.be.true;
                }
            }
        });
    });

    describe('imageToUint()', () => {
        it('data range', () => {
            for (let i: number; i < imageUint.rows; i++) {
                for (let j: number; j < imageUint.cols; j++) {
                    let pixel: Vec3 = <Vec3><unknown>imageUint.at(i, j);
                    expect(pixel.x >= 0 && pixel.x <= 255).to.be.true;
                    expect(pixel.y >= 0 && pixel.y <= 255).to.be.true;
                    expect(pixel.z >= 0 && pixel.z <= 255).to.be.true;
                }
            }
        });
    });
});