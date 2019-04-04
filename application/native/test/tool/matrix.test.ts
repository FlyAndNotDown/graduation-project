import { expect } from 'chai';
import { MatrixTool } from './../../src/tool/matrix';
import { describe, it } from 'mocha';

describe('MatrixTool', () => {
    let matrix: number[][][] = [
        [ [1, 1, 1], [2, 2, 2], [3, 3, 3] ],
        [ [4, 4, 4], [5, 5, 5], [6, 6, 6] ]
    ];
    let vector: number[][] = MatrixTool.convertToVector(matrix);

    describe('convertToVector()', () => {
        it('data size', () => {
            let length: number = vector.length;
            expect(length).to.be.eq(6);
        });

        it('data', () => {
            let length: number = vector.length;
            for (let i: number = 0; i < length; i++) {
                expect(vector[i][0]).to.be.eq(i + 1);
                expect(vector[i][1]).to.be.eq(i + 1);
                expect(vector[i][2]).to.be.eq(i + 1);
            }
        });
    });
});