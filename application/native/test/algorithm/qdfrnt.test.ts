import { expect } from 'chai';
import { Vector } from './../../src/model/vector';
import { ImageTool } from './../../src/tool/image';
import { MatrixTool } from './../../src/tool/matrix';
import { QDFRNT } from './../../src/algorithm/qdfrnt';
import { ComplexMatrix2D } from './../../src/model/complex-matrix2d';
import { Matrix2D } from './../../src/model/matrix2d';
import { Matrix3D, AddEmptyChannelType, RemoveChannelType } from './../../src/model/matrix3d';
import { describe, it } from 'mocha';

describe('QDFRNT', () => {
    let source: Matrix3D = ImageTool.readImageFileToDoubleMatrix('test/img/lena.bmp').addEmptyChannel(AddEmptyChannelType.Front);
    let randomMatrix: Matrix2D = MatrixTool.getRandomSquareMatrix(512);
    let kernel: ComplexMatrix2D = QDFRNT.kernel(0.25, 1, randomMatrix);
    let iKernel: ComplexMatrix2D = QDFRNT.kernel(-0.25, 1, randomMatrix);
    let quaternion: Vector = new Vector([0, 1, 0, 0]);
    let result1: Matrix3D = QDFRNT.lqdfrnt2(source, kernel, kernel, quaternion);
    let restored: Matrix3D = QDFRNT.lqdfrnt2(result1, iKernel, iKernel, quaternion);
    let result2: Matrix3D = QDFRNT.lqdfrnt2(result1, kernel, kernel, quaternion);
    let result3: Matrix3D = QDFRNT.lqdfrnt2(result2, kernel, kernel, quaternion);
    let result4: Matrix3D = QDFRNT.lqdfrnt2(result3, kernel, kernel, quaternion);
    ImageTool.writeDoubleMatrixToImageFile('test/dist/lqdfrnt2-result-1', result1.removeChannel(RemoveChannelType.Front));
    ImageTool.writeDoubleMatrixToImageFile('test/dist/lqdfrnt2-result-2', result2.removeChannel(RemoveChannelType.Front));
    ImageTool.writeDoubleMatrixToImageFile('test/dist/lqdfrnt2-result-3', result3.removeChannel(RemoveChannelType.Front));
    ImageTool.writeDoubleMatrixToImageFile('test/dist/lqdfrnt2-result-4', result4.removeChannel(RemoveChannelType.Front));
    ImageTool.writeDoubleMatrixToImageFile('test/dist/lqdfrnt2-restored', restored.removeChannel(RemoveChannelType.Front));

    describe('lqdfrnt2', () => {
        it('data', () => {
            expect(1).to.be.eq(1);
        });
    });
});