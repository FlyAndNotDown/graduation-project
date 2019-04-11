import { Matrix2D } from './model/matrix2d';
import { ComplexVectorWithChannels } from './model/complex-vector-with-channels';
import { ComplexVector } from './model/complex-vector';
import { Vector } from './model/vector';
import { MatrixTool } from './tool/matrix';
import { QDFRNT } from './algorithm/qdfrnt';
import { ComplexMatrix2D } from './model/complex-matrix2d';
import { Complex } from './model/complex';

// let source: ComplexVector = new Vector([1, 2, 3, 4]).convertToComplexVector();
// let randomMatrix: Matrix2D = MatrixTool.getRandomSquareMatrix(4);
// let kernel: ComplexMatrix2D = QDFRNT.kernel(0.25, 1, randomMatrix);
// let iKernel: ComplexMatrix2D = QDFRNT.kernel(-0.25, 1, randomMatrix);
// let result1: ComplexVector = QDFRNT.dfrnt(source, kernel);
// let restore: ComplexVector = QDFRNT.dfrnt(result1, iKernel);
// let result2: ComplexVector = QDFRNT.dfrnt(result1, kernel);
// let result3: ComplexVector = QDFRNT.dfrnt(result2, kernel);
// let result4: ComplexVector = QDFRNT.dfrnt(result3, kernel);

// let source: ComplexMatrix2D = new ComplexMatrix2D([
//     [new Complex(1, 0), new Complex(2, 0), new Complex(3, 0), new Complex(4, 0)],
//     [new Complex(5, 0), new Complex(6, 0), new Complex(7, 0), new Complex(8, 0)],
//     [new Complex(9, 0), new Complex(10, 0), new Complex(11, 0), new Complex(12, 0)],
//     [new Complex(13, 0), new Complex(14, 0), new Complex(15, 0), new Complex(16, 0)]
// ]);
// let randomMatrix: Matrix2D = MatrixTool.getRandomSquareMatrix(4);
// let kernel: ComplexMatrix2D = QDFRNT.kernel(0.25, 1, randomMatrix);
// let iKernel: ComplexMatrix2D = QDFRNT.kernel(-0.25, 1, randomMatrix);
// let result1: ComplexMatrix2D = QDFRNT.dfrnt2(source, kernel, kernel);
// let restore: ComplexMatrix2D = QDFRNT.dfrnt2(result1, iKernel, iKernel);
// let result2: ComplexMatrix2D = QDFRNT.dfrnt2(result1, kernel, kernel);
// let result3: ComplexMatrix2D = QDFRNT.dfrnt2(result2, kernel, kernel);
// let result4: ComplexMatrix2D = QDFRNT.dfrnt2(result3, kernel, kernel);

let source: ComplexVectorWithChannels = new ComplexVectorWithChannels([
    [new Complex(1, 1), new Complex(2, 2), new Complex(3, 3), new Complex(4, 4)],
    [new Complex(5, 5), new Complex(6, 6), new Complex(7, 7), new Complex(8, 8)],
    [new Complex(9, 9), new Complex(10, 10), new Complex(11, 11), new Complex(12, 12)],
    [new Complex(13, 13), new Complex(14, 14), new Complex(15, 15), new Complex(16, 16)],
    [new Complex(17, 17), new Complex(18, 18), new Complex(19, 19), new Complex(20, 20)]
]);
let randomMatrix: Matrix2D = MatrixTool.getRandomSquareMatrix(5);
let kernel: ComplexMatrix2D = QDFRNT.kernel(0.25, 1, randomMatrix);
let iKernel: ComplexMatrix2D = QDFRNT.kernel(-0.25, 1, randomMatrix);
let quaternion: Vector = new Vector([0, 1, 0, 0]);
let result1: ComplexVectorWithChannels = QDFRNT.lqdfrnt(source, kernel, quaternion);
let restore: ComplexVectorWithChannels = QDFRNT.lqdfrnt(result1, iKernel, quaternion);
let result2: ComplexVectorWithChannels = QDFRNT.lqdfrnt(result1, kernel, quaternion);
let result3: ComplexVectorWithChannels = QDFRNT.lqdfrnt(result2, kernel, quaternion);
let result4: ComplexVectorWithChannels = QDFRNT.lqdfrnt(result3, kernel, quaternion);

console.log('over');