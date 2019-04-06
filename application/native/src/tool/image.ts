import { Matrix3D } from './../model/matrix3d';
import { Mat, CV_64FC3, CV_8UC3, Vec3, imread, IMREAD_COLOR, imwrite } from 'opencv4nodejs';

export class ImageTool {
    public static imageToDouble(image: Mat) {
        // change image to double type
        return image.convertTo(CV_64FC3, 1 / 255);
    }

    public static imageToUint(image: Mat) {
        // change image to integer type
        return image.convertTo(CV_8UC3, 255);
    }

    public static convertToMatrix(image: Mat): Matrix3D {
        // get size info
        let rows: number = image.rows;
        let cols: number = image.cols;
        
        // init matrix
        let matrix: number[][][] = [];

        // copy
        for (let i: number = 0; i < rows; i++) {
            let aRow: number[][] = [];
            for (let j: number = 0; j < cols; j++) {
                let pixel: Vec3 = <Vec3><unknown>image.at(i, j);
                aRow.push([pixel.x, pixel.y, pixel.z]);
            }
            matrix.push(aRow);
        }

        // return
        return new Matrix3D(matrix);
    }

    public static convertToImage(matrix: Matrix3D): Mat {
        // get size info
        let rows: number = matrix.rows;
        let cols: number = matrix.cols;
        
        // init image mat
        let image: Mat = new Mat(rows, cols, CV_64FC3);

        // copy
        for (let i: number = 0; i < rows; i++) {
            for (let j: number = 0; j < cols; j++) {
                image.set(i, j, new Vec3(matrix.get(i, j, 0), matrix.get(i, j, 1), matrix.get(i, j, 2)));
            }
        }

        // return
        return image;
    }

    public static readImageFileToDoubleMatrix(path: string): Matrix3D {
        // return result
        return ImageTool.convertToMatrix(ImageTool.imageToDouble(imread(path, IMREAD_COLOR)));
    }

    public static writeDoubleMatrixToImageFile(path: string, matrix: Matrix3D) {
        // do write
        return imwrite(path, ImageTool.imageToUint(ImageTool.convertToImage(matrix)));
    }
}