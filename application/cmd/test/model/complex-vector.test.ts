import { expect } from 'chai';
import { ComplexVector } from './../../src/model/complex-vector';
import { describe } from 'mocha';
import { Complex } from '../../src/model/complex';

describe('ComplexVector', () => {
    let vector: ComplexVector = new ComplexVector([
        new Complex(1, 1), new Complex(2, 2), new Complex(3, 3)
    ]);
    let array: Complex[] = vector.getData();

    describe('constructor()', () => {
        it('instance test', () => {
            expect(vector).not.to.be.null;
        });
    });

    describe('zeros() & set()', () => {
        it('data', () => {
            let zeros: ComplexVector = ComplexVector.zeros(5);
            for (let i: number = 0; i < zeros.length; i++) {
                zeros.set(i, new Complex(i + 1, i + 1));
            }
            for (let i: number = 0; i < zeros.length; i++) {
                expect(zeros.get(i).real).to.be.eq(i + 1);
                expect(zeros.get(i).imag).to.be.eq(i + 1);
            }
        });
    });

    describe('get()', () => {
        it('simple test', () => {
            for (let i: number = 0; i < vector.length; i++) {
                expect(vector.get(i).real).to.be.eq(i + 1);
                expect(vector.get(i).imag).to.be.eq(i + 1);
            }
        });
    });

    describe('getData()', () => {
        it('data', () => {
            for (let i: number = 0; i < 3; i++) {
                expect(array[i].real).to.be.eq(i + 1);
                expect(array[i].imag).to.be.eq(i + 1);
            }
        });
    });

    describe('add()', () => {
        it('data', () => {
            let result: ComplexVector = vector.add(vector);
            for (let i: number = 0; i < result.length; i++) {
                expect(result.get(i).real).to.be.eq(vector.get(i).real * 2);
                expect(result.get(i).imag).to.be.eq(vector.get(i).imag * 2);
            }
        });
    });

    describe('sub()', () => {
        it('data', () => {
            let vector1: ComplexVector = new ComplexVector([
                new Complex(5, 5), new Complex(6, 6), new Complex(7, 7)
            ]);
            let vector2: ComplexVector = new ComplexVector([
                new Complex(1, 1), new Complex(2, 2), new Complex(3, 3)
            ]);
            let correct: ComplexVector = new ComplexVector([
                new Complex(4, 4), new Complex(4, 4), new Complex(4, 4)
            ]);
            let result: ComplexVector = vector1.sub(vector2);
            for (let i: number = 0; i < result.length; i++) {
                expect(result.get(i).real).to.be.eq(correct.get(i).real);
                expect(result.get(i).imag).to.be.eq(correct.get(i).imag);
            }
        });
    });

    describe('copy()', () => {
        let source: ComplexVector = new ComplexVector([
            new Complex(1, 1),
            new Complex(2, 2),
            new Complex(3, 3),
            new Complex(4, 4),
            new Complex(5, 5)
        ]);
        let copy: ComplexVector = source.copy();
        
        it('instance', () => {
            expect(copy).not.to.be.eq(source);
        });

        it('data', () => {
            for (let i: number = 0; i < copy.length; i++) {
                expect(copy.get(i).real).to.be.eq(source.get(i).real);
                expect(copy.get(i).imag).to.be.eq(source.get(i).imag);
            }
        });
    });
});