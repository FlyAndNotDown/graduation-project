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
    
    describe('copy()', () => {
        let source: Vector = new Vector([1, 2, 3, 4, 5]);
        let copy: Vector = source.copy();
        
        it('instance', () => {
            expect(copy).not.to.be.eq(source);
        });

        it('data', () => {
            for (let i: number = 0; i < copy.length; i++) {
                expect(copy.get(i)).to.be.eq(source.get(i));
            }
        });
    });

    describe('mod()', () => {
        it('data', () => {
            let source: Vector = new Vector([3, 4, 0]);
            expect(source.mod()).to.be.eq(5);
        });
    });

    describe('angle()', () => {
        it('data', () => {
            let vector1: Vector = new Vector([2, -3, Math.sqrt(3)]);
            let vector2: Vector = new Vector([1, 0, 0]);
            let angle: number = vector1.angle(vector2);
            expect(1).to.be.eq(1);
        });
    });

    describe('mul()', () => {
        it('data', () => {
            let source: Vector = new Vector([1, 2, 3, 4]);
            let result: Vector = source.mul(3);
            let correct: Vector = new Vector([3, 6, 9, 12]);
            for (let i: number = 0; i < result.length; i++) {
                expect(result.get(i)).to.be.eq(correct.get(i));
            }

            expect(source.mul(source)).to.be.eq(30);
        });
    });
});