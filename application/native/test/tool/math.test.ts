import { MathTool } from './../../src/tool/math';
import { describe, it } from 'mocha';
import { expect } from 'chai';

describe('MathTool', () => {
    let randomMatrix: number[][] = MathTool.getRandomMatrix(4);

    describe('mod()', () => {
        it('test 1', () => {
            expect(MathTool.mod(7, 4)).to.be.eq(3);
        });

        it('test 2', () => {
            expect(MathTool.mod(-7, 4)).to.be.eq(1);
        });

        it('test 3', () => {
            expect(MathTool.mod(7, -4)).to.be.eq(-1);
        });

        it('test 4', () => {
            expect(MathTool.mod(-7, -4)).to.be.eq(-3);
        });
    });

    
    describe('rem()', () => {
        it('test 1', () => {
            expect(MathTool.rem(7, 4)).to.be.eq(3);
        });

        it('test 2', () => {
            expect(MathTool.rem(-7, 4)).to.be.eq(-3);
        });

        it('test 3', () => {
            expect(MathTool.rem(7, -4)).to.be.eq(3);
        });

        it('test 4', () => {
            expect(MathTool.rem(-7, -4)).to.be.eq(-3);
        });
    });

    describe('getRandomMatrix()', () => {
        it('data size', () => {
            expect(randomMatrix.length).to.be.eq(4);
            for (let i: number = 0; i < 4; i++) {
                expect(randomMatrix[i].length).to.be.eq(4);
            }
        });

        it('data range', () => {
            for (let i: number = 0; i < 4; i++) {
                for (let j: number = 0; j < 4; j++) {
                    expect(randomMatrix[i][j] >= 0 && randomMatrix[i][j] <= 1).to.be.true;
                }
            }
        });
    });
});