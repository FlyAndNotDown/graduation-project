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
                expect(array[i + 1]).to.be.eq(i + 1);
            }
        });
    });
});