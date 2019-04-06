import { Vector } from './../../src/model/vector';
import { describe, it } from 'mocha';
import { expect } from 'chai';

describe('Vector', () => {
    let vector: Vector = new Vector([1, 2, 3]);

    describe('constructor()', () => {
        it('instance test', () => {
            expect(vector).not.to.be.null;
        });
    });

    describe('get()', () => {
        it('simple test', () => {
            expect(vector.get(1)).to.be.eq(2);
        });
    });
});