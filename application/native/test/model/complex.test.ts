import { Complex } from './../../src/model/complex';
import { describe, it } from 'mocha';
import { expect } from 'chai';

describe('Complex', () => {
    let a: Complex = new Complex(2, 3);
    let b: Complex = new Complex(3, 4);

    describe('add()', () => {
        it('returns', () => {
            let result: Complex = Complex.add(a, b);
            expect(result.real).to.be.eq(5);
            expect(result.imag).to.be.eq(7);
            result = a.add(b);
            expect(result.real).to.be.eq(5);
            expect(result.imag).to.be.eq(7);
        });
    });

    describe('sub()', () => {
        it('returns', () => {
            let result: Complex = Complex.sub(a, b);
            expect(result.real).to.be.eq(-1);
            expect(result.imag).to.be.eq(-1);
            result = Complex.sub(b, a);
            expect(result.real).to.be.eq(1);
            expect(result.imag).to.be.eq(1);
            result = a.sub(b);
            expect(result.real).to.be.eq(-1);
            expect(result.imag).to.be.eq(-1);
            result = b.sub(a);
            expect(result.real).to.be.eq(-1);
            expect(result.imag).to.be.eq(-1);
        });
    });

    describe('mul()', () => {
        it('Complex with Number', () => {
            let result: Complex = Complex.mul(a, 3);
            expect(result.real).to.be.eq(6);
            expect(result.imag).to.be.eq(9);
            result = a.mul(3);
            expect(result.real).to.be.eq(6);
            expect(result.imag).to.be.eq(9);
        });

        it('Complex with Complex', () => {
            let result: Complex = Complex.mul(a, b);
            expect(result.real).to.be.eq(-6);
            expect(result.imag).to.be.eq(17);
            result = a.mul(b);
            expect(result.real).to.be.eq(-6);
            expect(result.imag).to.be.eq(17);
        });
    });

    describe('div()', () => {
        it('returns', () => {
            let c: Complex = new Complex(6, 6);
            let d: Complex = new Complex(2, 2);
            let result: Complex = Complex.div(c, d);
            expect(result.real).to.be.eq(3);
            expect(result.imag).to.be.eq(0);
            result = c.div(d);
            expect(result.real).to.be.eq(3);
            expect(result.imag).to.be.eq(0);
        });
    });
});