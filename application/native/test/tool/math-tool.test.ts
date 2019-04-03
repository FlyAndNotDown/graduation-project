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
});