import * as Mathjs from 'mathjs';
import { describe, it } from 'mocha';
import { expect } from 'chai';

describe('module Math.js', () => {
    describe('.zeros() & Matrix.get()', () => {
        it('simple test', () => {
            let matrix: Mathjs.Matrix = <Mathjs.Matrix>Mathjs.zeros([2, 4, 3]);
            for (let i: number; i < 2; i++) {
                for (let j: number; j < 4; j++) {
                    for (let k: number; k < 3; k++) {
                        expect(matrix.get([i, j, k])).to.be.eq(0);
                    }
                }
            }
        });
    });
});