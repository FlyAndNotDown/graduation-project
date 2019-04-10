import { Vector } from './../model/vector';
import { ComplexMatrix2D, ConvertToComplexVectorArrayType, RestoreFromComplexVectorArrayType } from './../model/complex-matrix2d';
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
        let sourceTransport: ComplexMatrix2D = source.convertToComplexMatrix2D().transport();
        let result: ComplexMatrix2D = kernel.mul(sourceTransport).transport();
        return result.convertToComplexVectorArray(ConvertToComplexVectorArrayType.RowAsVector)[0];
    }

    public static dfrnt2(source: ComplexMatrix2D, kernelRow: ComplexMatrix2D, kernelCol: ComplexMatrix2D): ComplexMatrix2D {
        let rowVectors: ComplexVector[] = source.convertToComplexVectorArray(ConvertToComplexVectorArrayType.RowAsVector);
        let rowOutputVectors: ComplexVector[] = [];
        for (let i: number = 0; i < rowVectors.length; i++) {
            rowOutputVectors.push(QDFRNT.dfrnt(rowVectors[i], kernelRow));
        }
        let output: ComplexMatrix2D = ComplexMatrix2D.restoreFromComplexVectorArray(RestoreFromComplexVectorArrayType.RowAsVector, rowOutputVectors);
        let colVectors: ComplexVector[] = output.convertToComplexVectorArray(ConvertToComplexVectorArrayType.ColAsVector);
        let colOutputVectors: ComplexVector[] = [];
        for (let i: number = 0; i < colVectors.length; i++) {
            colOutputVectors.push(QDFRNT.dfrnt(colVectors[i], kernelCol));
        }

        return ComplexMatrix2D.restoreFromComplexVectorArray(RestoreFromComplexVectorArrayType.ColAsVector, colOutputVectors);
    }
}