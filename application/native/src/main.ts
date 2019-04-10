import { ComplexVector } from './model/complex-vector';
import { Vector } from './model/vector';
import { MatrixTool } from './tool/matrix';
import { QDFRNT } from './algorithm/qdfrnt';
import { ComplexMatrix2D } from './model/complex-matrix2d';
import { Complex } from './model/complex';

// let source: ComplexVector = new Vector([1, 2, 3, 4]).convertToComplexVector();
// let kernel: ComplexMatrix2D = QDFRNT.kernel(0.25, 1, MatrixTool.getRandomSquareMatrix(4));
// let result1: ComplexVector = QDFRNT.dfrnt(source, kernel);
// let result2: ComplexVector = QDFRNT.dfrnt(result1, kernel);
// let result3: ComplexVector = QDFRNT.dfrnt(result2, kernel);
// let result4: ComplexVector = QDFRNT.dfrnt(result3, kernel);

let source: ComplexMatrix2D = new ComplexMatrix2D([
    [new Complex(1, 0), new Complex(2, 0), new Complex(3, 0), new Complex(4, 0)],
    [new Complex(5, 0), new Complex(6, 0), new Complex(7, 0), new Complex(8, 0)],
    [new Complex(9, 0), new Complex(10, 0), new Complex(11, 0), new Complex(12, 0)],
    [new Complex(13, 0), new Complex(14, 0), new Complex(15, 0), new Complex(16, 0)]
]);
let kernelRow: ComplexMatrix2D = QDFRNT.kernel(0.25, 1, MatrixTool.getRandomSquareMatrix(4));
let kernelCol: ComplexMatrix2D = QDFRNT.kernel(0.25, 1, MatrixTool.getRandomSquareMatrix(4));
let result1: ComplexMatrix2D = QDFRNT.dfrnt2(source, kernelRow, kernelCol);
let result2: ComplexMatrix2D = QDFRNT.dfrnt2(result1, kernelRow, kernelCol);
let result3: ComplexMatrix2D = QDFRNT.dfrnt2(result2, kernelRow, kernelCol);
let result4: ComplexMatrix2D = QDFRNT.dfrnt2(result3, kernelRow, kernelCol);


console.log('over');