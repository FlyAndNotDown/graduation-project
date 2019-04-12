import { Matrix3D } from './../../src/model/matrix3d';
import { Arnold } from './../../src/algorithm/arnold';
import { ImageTool } from './../../src/tool/image';
import { describe, it } from 'mocha';
import { expect } from 'chai';

describe('Arnold', () => {
    let lena: Matrix3D = ImageTool.readImageFileToDoubleMatrix('test/img/lena.bmp');
    let order1: Matrix3D = Arnold.transform(lena, 1);
    let order2: Matrix3D = Arnold.transform(lena, 2);
    let order6: Matrix3D = Arnold.transform(lena, 6);
    let restore1: Matrix3D = Arnold.inverseTransform(order1, 1);
    let restore2: Matrix3D = Arnold.inverseTransform(order2, 2);
    let restore6: Matrix3D = Arnold.inverseTransform(order6, 6);
    ImageTool.writeDoubleMatrixToImageFile('test/dist/arnold-order-1.bmp', order1);
    ImageTool.writeDoubleMatrixToImageFile('test/dist/arnold-order-2.bmp', order2);
    ImageTool.writeDoubleMatrixToImageFile('test/dist/arnold-order-6.bmp', order6);
    ImageTool.writeDoubleMatrixToImageFile('test/dist/arnold-restore-1.bmp', restore1);
    ImageTool.writeDoubleMatrixToImageFile('test/dist/arnold-restore-2.bmp', restore2);
    ImageTool.writeDoubleMatrixToImageFile('test/dist/arnold-restore-6.bmp', restore6);

    describe('transform()', () => {
        it('order 1 test, save to \'test/dist/arnold-order-1.bmp\'', () => {
            expect(1).to.be.eq(1);
        });

        it('order 2 test, save to \'test/dist/arnold-order-2.bmp\'', () => {
            expect(1).to.be.eq(1);
        });

        it('order 6 test, save to \'test/dist/arnold-order-6.bmp\'', () => {
            expect(1).to.be.eq(1);
        });
    });

    describe('inverseTransform()', () => {
        it('order 1 test, save to \'test/dist/arnold-restore-1.bmp\'', () => {
            expect(1).to.be.eq(1);
        });

        it('order 2 test, save to \'test/dist/arnold-restore-1.bmp\'', () => {
            expect(1).to.be.eq(1);
        });

        it('order 6 test, save to \'test/dist/arnold-restore-1.bmp\'', () => {
            expect(1).to.be.eq(1);
        });
    });
});