import { MathTool } from './../../src/tool/math-tool';
import { expect } from 'chai';
import { describe, it } from "mocha";

describe('MathTool', () => {
    describe('static mod(x: number, y: number): number', () => {
        it('test case 1', () => {
            expect(MathTool.mod(7, 4)).to.be.eq(3);
        });

        it('test case 2', () => {
            expect(MathTool.mod(-7, 4)).to.be.eq(1);
        });

        it('test case 3', () => {
            expect(MathTool.mod(7, -4)).to.be.eq(-1);
        });

        it('test case 4', () => {
            expect(MathTool.mod(-7, -4)).to.be.eq(-3);
        });
    });

    describe('static getRandomMatrix(length: number): number[][]', () => {
        let randomMatrix: number[][] = MathTool.getRandomMatrix(12);

        it('size', () => {
            expect(randomMatrix.length).to.be.eq(12);
            for (let i: number = 0; i < 12; i++) {
                expect(randomMatrix[i].length).to.be.eq(12);
            }
        });

        it('data range', () => {
            for (let i: number = 0; i < 12; i++) {
                for (let j: number = 0; j < 12; j++) {
                    expect(randomMatrix[i][j] >= 0 && randomMatrix[i][j] < 1).to.be.true;
                }
            }
        });
    });
});