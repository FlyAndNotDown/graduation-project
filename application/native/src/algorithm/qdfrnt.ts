import { Vector } from './../model/vector';
import { ComplexMatrix2D, ConvertToComplexVectorArrayType } from './../model/complex-matrix2d';
import { Complex } from './../model/complex';
import { Matrix2D } from './../model/matrix2d';
import { ComplexVector } from '../model/complex-vector';

export class QDFRNT {
    public static kernel(order: number, cycle: number, random: Matrix2D): ComplexMatrix2D {
        // get size info
        let rows: number = random.rows;

        // get the random symmetrical matrix
        let symMatrix: Matrix2D = random.add(random.transport()).div(2);

        // get the random eigen matrix
        let eigMatrix: Matrix2D = symMatrix.eigenVectors();
        let orthMatrix: Matrix2D = eigMatrix.orthogonal();
        let orthComplexMatrix: ComplexMatrix2D = orthMatrix.convertToComplexMatrix2D();

        // get the special matrix
        let specialMatrixSource: Complex[] = [];
        for (let i: number = 0; i < rows; i++) {
            specialMatrixSource.push(new Complex(0, -2 * Math.PI * i * order / cycle).exp());
        }
        let specialMatrix: ComplexMatrix2D = ComplexMatrix2D.diagonal(new ComplexVector(specialMatrixSource));
    
        // get kernel matrix
        return orthComplexMatrix.mul(specialMatrix).mul(orthComplexMatrix.transport());
    }

    public static dfrnt(source: ComplexVector, kernel: ComplexMatrix2D): ComplexVector {
        return kernel.mul(source.convertToComplexMatrix2D().transport()).transport().convertToComplexVectorArray(ConvertToComplexVectorArrayType.RowAsVector)[0];
    }
}