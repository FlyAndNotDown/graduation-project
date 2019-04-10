import { ComplexVector } from './model/complex-vector';
import { Vector } from './model/vector';
import { MatrixTool } from './tool/matrix';
import { QDFRNT } from './algorithm/qdfrnt';
import { ComplexMatrix2D } from './model/complex-matrix2d';

let source: ComplexVector = new Vector([1, 2, 3, 4]).convertToComplexVector();
let kernel: ComplexMatrix2D = QDFRNT.kernel(0.25, 1, MatrixTool.getRandomSquareMatrix(4));
let result1: ComplexVector = QDFRNT.dfrnt(source, kernel);
let result2: ComplexVector = QDFRNT.dfrnt(result1, kernel);
let result3: ComplexVector = QDFRNT.dfrnt(result2, kernel);
let result4: ComplexVector = QDFRNT.dfrnt(result3, kernel);

console.log('over');