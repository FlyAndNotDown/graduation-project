import { Matrix3D, AddEmptyChannelType, RemoveChannelType } from './model/matrix3d';
import { VectorWithChannels } from './model/vector-with-channels';
import { Matrix2D } from './model/matrix2d';
import { ComplexVectorWithChannels } from './model/complex-vector-with-channels';
import { ComplexVector } from './model/complex-vector';
import { Vector } from './model/vector';
import { MatrixTool } from './tool/matrix';
import { QDFRNT } from './algorithm/qdfrnt';
import { ComplexMatrix2D } from './model/complex-matrix2d';
import { Complex } from './model/complex';
import { ImageTool } from './tool/image';
const hello = require('./Release/hello');

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

// let source: VectorWithChannels = new VectorWithChannels([
//     [11, 12, 13, 14],
//     [21, 22, 23, 24],
//     [31, 32, 33, 34],
//     [41, 42, 43, 44],
//     [51, 52, 53, 54]
// ]);
// let randomMatrix: Matrix2D = MatrixTool.getRandomSquareMatrix(5);
// let kernel: ComplexMatrix2D = QDFRNT.kernel(0.25, 1, randomMatrix);
// let iKernel: ComplexMatrix2D = QDFRNT.kernel(-0.25, 1, randomMatrix);
// let quaternion: Vector = new Vector([0, 1, 0, 0]);
// let result1: VectorWithChannels = QDFRNT.lqdfrnt(source, kernel, quaternion);
// let restored: VectorWithChannels = QDFRNT.lqdfrnt(result1, iKernel, quaternion);
// let result2: VectorWithChannels = QDFRNT.lqdfrnt(result1, kernel, quaternion);
// let result3: VectorWithChannels = QDFRNT.lqdfrnt(result2, kernel, quaternion);
// let result4: VectorWithChannels = QDFRNT.lqdfrnt(result3, kernel, quaternion);

// let source: Matrix3D = ImageTool.readImageFileToDoubleMatrix('application/native/test/img/lena.bmp').addEmptyChannel(AddEmptyChannelType.Front);
// let randomMatrix: Matrix2D = MatrixTool.getRandomSquareMatrix(512);
// let kernel: ComplexMatrix2D = QDFRNT.kernel(0.25, 1, randomMatrix);
// let iKernel: ComplexMatrix2D = QDFRNT.kernel(-0.25, 1, randomMatrix);
// let quaternion: Vector = new Vector([0, 1, 0, 0]);
// let result1: Matrix3D = QDFRNT.lqdfrnt2(source, kernel, kernel, quaternion);
// let restored: Matrix3D = QDFRNT.lqdfrnt2(result1, iKernel, iKernel, quaternion);
// let result2: Matrix3D = QDFRNT.lqdfrnt2(result1, kernel, kernel, quaternion);
// let result3: Matrix3D = QDFRNT.lqdfrnt2(result2, kernel, kernel, quaternion);
// let result4: Matrix3D = QDFRNT.lqdfrnt2(result3, kernel, kernel, quaternion);
// ImageTool.writeDoubleMatrixToImageFile('application/native/test/dist/lqdfrnt2-result-1', result1.removeChannel(RemoveChannelType.Front));
// ImageTool.writeDoubleMatrixToImageFile('application/native/test/dist/lqdfrnt2-result-2', result2.removeChannel(RemoveChannelType.Front));
// ImageTool.writeDoubleMatrixToImageFile('application/native/test/dist/lqdfrnt2-result-3', result3.removeChannel(RemoveChannelType.Front));
// ImageTool.writeDoubleMatrixToImageFile('application/native/test/dist/lqdfrnt2-result-4', result4.removeChannel(RemoveChannelType.Front));
// ImageTool.writeDoubleMatrixToImageFile('application/native/test/dist/lqdfrnt2-restored', restored.removeChannel(RemoveChannelType.Front));

console.log(hello.hello());