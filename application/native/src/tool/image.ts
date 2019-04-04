import { Mat, CV_64FC3, CV_8UC3, Vec3 } from 'opencv4nodejs';
import * as Mathjs from 'mathjs';

export class ImageTool {
    public static imageToDouble(image: Mat) {
        // change image to double type
        return image.convertTo(CV_64FC3, 1 / 255);
    }

    public static imageToUint(image: Mat) {
        // change image to integer type
        return image.convertTo(CV_8UC3, 255);
    }

    public static convertToMatrix(image: Mat): Mathjs.Matrix {
        // get size info
        let rows: number = image.rows;
        let cols: number = image.cols;

        // init matrix
        let result: Mathjs.Matrix = <Mathjs.Matrix>Mathjs.zeros([rows, cols, 3]);

        // fill values
        for (let i: number; i < rows; i++) {
            for (let j: number; j < cols; j++) {
                let pixel = <Vec3><unknown>image.at(i, j);
                result.set([i, j, 0], pixel.x);
                result.set([i, j, 1], pixel.y);
                result.set([i, j, 2], pixel.z);
            }
        }

        // return result
        return result;
    }

    public static convertToImage(matrix: Mathjs.Matrix): Mat {
        // get size info
        let size: number[] = <number[]>Mathjs.size(matrix);
        let rows: number = size[0];
        let cols: number = size[1];

        // init image mat
        let image: Mat = new Mat(rows, cols, CV_64FC3);

        // copy values
        for (let i: number; i < rows; i++) {
            for (let j: number; j < cols; j++) {
                image.set(i, j, [matrix.get([i, j, 0]), matrix.get([i, j, 1]), matrix.get([i, j, 2])]);
            }
        }

        // return result
        return image;
    }
}