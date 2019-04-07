import { Vector } from './../../src/model/vector';
import { describe, it } from 'mocha';
import { expect } from 'chai';

describe('Vector', () => {
    let vector: Vector = new Vector([1, 2, 3]);
    let array: number[] = vector.getData();

    describe('constructor()', () => {
        it('instance test', () => {
            expect(vector).not.to.be.null;
        });
    });

    describe('zeros()', () => {
        it('data', () => {
            let zeros: Vector = Vector.zeros(5);
            for (let i: number = 0; i < zeros.length; i++) {
                expect(zeros.get(i)).to.be.eq(0);
            }
        });
    });

    describe('get()', () => {
        it('simple test', () => {
            for (let i: number = 0; i < 3; i++) {
                expect(vector.get(i)).to.be.eq(i + 1);
            }
        });
    });

    describe('set()', () => {
        it('data', () => {
            let zeros: Vector = Vector.zeros(5);
            for (let i: number = 0; i < zeros.length; i++) {
                zeros.set(i, i + 1);
            }
            for (let i: number = 0; i < zeros.length; i++) {
                expect(zeros.get(i)).to.be.eq(i + 1);
            }
        });
    });

    describe('getData()', () => {
        it('data', () => {
            for (let i: number = 0; i < 3; i++) {
                expect(array[i]).to.be.eq(i + 1);
            }
        });
    });

    describe('add()', () => {
        it('data', () => {
            let result: Vector = vector.add(vector);
            for (let i: number = 0; i < result.length; i++) {
                expect(result.get(i)).to.be.eq(vector.get(i) * 2);
            }
        });
    });

    describe('sub()', () => {
        it('data', () => {
            let vector1: Vector = new Vector([5, 6, 7]);
            let vector2: Vector = new Vector([1, 2, 3]);
            let correct: Vector = new Vector([4, 4, 4]);
            let result: Vector = vector1.sub(vector2);
            for (let i: number = 0; i < result.length; i++) {
                expect(result.get(i)).to.be.eq(correct.get(i));
            }
        });
    });
});