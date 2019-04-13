import { MathTool } from './../../src/tool/math';
import { describe, it } from 'mocha';
import { expect } from 'chai';

describe('MathTool', () => {
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
});