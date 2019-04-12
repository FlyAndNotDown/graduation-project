import { VectorWithChannels } from './../model/vector-with-channels';
import { ComplexMatrix2D, ConvertToComplexVectorArrayType, RestoreFromComplexVectorArrayType } from './../model/complex-matrix2d';
import { Complex } from './../model/complex';
import { Matrix2D } from './../model/matrix2d';
import { ComplexVector } from '../model/complex-vector';
import { Vector } from '../model/vector';

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

    public static lqdfrnt(source: VectorWithChannels, kernel: ComplexMatrix2D, unitPureQuaternion: Vector): VectorWithChannels {
        if (unitPureQuaternion.length !== 4) {
            throw new Error('quaternion vector\'s length should be equal 4');
        }
        if (source.channels !== 4) {
            throw new Error('source vector\'s channels should be equal 4');
        }
        if (source.length !== kernel.rows) {
            throw new Error('source vector\s length should be equal kernel matrix\'s rows');
        }
        
        let sourceChannels: Vector[] = source.convertToVectorArray();
        let sourceR: ComplexVector = sourceChannels[0].convertToComplexVector();
        let sourceI: ComplexVector = sourceChannels[1].convertToComplexVector();
        let sourceJ: ComplexVector = sourceChannels[2].convertToComplexVector();
        let sourceK: ComplexVector = sourceChannels[3].convertToComplexVector();

        let ua: number = unitPureQuaternion.get(1);
        let ub: number = unitPureQuaternion.get(2);
        let uc: number = unitPureQuaternion.get(3);

        let outputR: ComplexVector = QDFRNT.dfrnt(sourceR, kernel);
        let outputI: ComplexVector = QDFRNT.dfrnt(sourceI, kernel);
        let outputJ: ComplexVector = QDFRNT.dfrnt(sourceJ, kernel);
        let outputK: ComplexVector = QDFRNT.dfrnt(sourceK, kernel);

        let outputRParts: Vector[] = outputR.splitComplexParts();
        let outputIParts: Vector[] = outputI.splitComplexParts();
        let outputJParts: Vector[] = outputJ.splitComplexParts();
        let outputKParts: Vector[] = outputK.splitComplexParts();
        let outputRReal: Vector = outputRParts[0];
        let outputRImag: Vector = outputRParts[1];
        let outputIReal: Vector = outputIParts[0];
        let outputIImag: Vector = outputIParts[1];
        let outputJReal: Vector = outputJParts[0];
        let outputJImag: Vector = outputJParts[1];
        let outputKReal: Vector = outputKParts[0];
        let outputKImag: Vector = outputKParts[1];

        let result: Vector[] = [];
        result.push(outputRReal.sub(outputIImag.mul(ua)).sub(outputJImag.mul(ub)).sub(outputKImag.mul(uc)));
        result.push(outputIReal.add(outputRImag.mul(ua)).sub(outputJImag.mul(uc)).add(outputKImag.mul(ub)));
        result.push(outputJReal.add(outputRImag.mul(ub)).sub(outputKImag.mul(ua)).add(outputIImag.mul(uc)));
        result.push(outputKReal.add(outputRImag.mul(uc)).sub(outputIImag.mul(ub)).add(outputJImag.mul(ua)));

        return VectorWithChannels.restoreFromVectorArray(result);
    }
}