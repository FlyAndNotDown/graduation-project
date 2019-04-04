import { ImageTool } from './../../src/tool/image';
import { Mat, CV_8UC3, Vec3 } from 'opencv4nodejs';
import { describe, it } from 'mocha';
import { expect } from 'chai';

describe('ImageTool', () => {
    let source: Mat = new Mat(3, 4, CV_8UC3);
    for (let i: number = 0; i < 3; i++) {
        for (let j: number = 0; j < 4; j++) {
            let temp: number = i * 4 + j;
            source.set(i, j, [temp, temp, temp]);
        }
    }
    let sourceDouble: Mat = ImageTool.imageToDouble(source);
    let sourceUint: Mat = ImageTool.imageToUint(sourceDouble);
    let matrix: number[][][] = ImageTool.convertToMatrix(sourceDouble);
    let restore: Mat = ImageTool.convertToImage(matrix);

    describe('data source', () => {
        it('correct', () => {
            for (let i: number = 0; i < 3; i++) {
                for (let j: number = 0; j < 4; j++) {
                    let pixel: Vec3 = <Vec3><unknown>source.at(i, j);
                    expect(pixel.x).to.be.eq(i * 4 + j);
                    expect(pixel.y).to.be.eq(i * 4 + j);
                    expect(pixel.z).to.be.eq(i * 4 + j);
                }
            }
        });
    });

    describe('imageToDouble()', () => {
        it('data range', () => {
            for (let i: number = 0; i < 3; i++) {
                for (let j: number = 0; j < 4; j++) {
                    let pixel: Vec3 = <Vec3><unknown>sourceDouble.at(i, j);
                    expect(pixel.x >= 0 && pixel.x <= 1).to.be.true;
                    expect(pixel.x >= 0 && pixel.x <= 1).to.be.true;
                    expect(pixel.x >= 0 && pixel.x <= 1).to.be.true;
                }
            }
        });
    });

    describe('imageToUint', () => {
        it('data range', () => {
            for (let i: number = 0; i < 3; i++) {
                for (let j: number = 0; j < 4; j++) {
                    let pixel: Vec3 = <Vec3><unknown>sourceUint.at(i, j);
                    expect(pixel.x >= 0 && pixel.x <= 255).to.be.true;
                    expect(pixel.x >= 0 && pixel.x <= 255).to.be.true;
                    expect(pixel.x >= 0 && pixel.x <= 255).to.be.true;
                }
            }
        });
    });

    describe('convertToMatrix', () => {
        it('data', () => {
            for (let i: number = 0; i < 3; i++) {
                for (let j: number = 0; j < 4; j++) {
                    let pixel: Vec3 = <Vec3><unknown>sourceDouble.at(i, j);
                    expect(matrix[i][j][0]).to.be.eq(pixel.x);
                    expect(matrix[i][j][1]).to.be.eq(pixel.y);
                    expect(matrix[i][j][2]).to.be.eq(pixel.z);
                }
            }
        });
    });

    describe('convertToImage', () => {
        it('data', () => {
            for (let i: number = 0; i < 3; i++) {
                for (let j: number = 0; j < 4; j++) {
                    let pixel: Vec3 = <Vec3><unknown>restore.at(i, j);
                    expect(pixel.x).to.be.eq(matrix[i][j][0]);
                    expect(pixel.x).to.be.eq(matrix[i][j][1]);
                    expect(pixel.x).to.be.eq(matrix[i][j][2]);
                }
            }
        });
    });
});