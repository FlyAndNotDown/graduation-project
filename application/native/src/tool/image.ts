import { Mat, CV_64FC3, CV_8UC3, Vec3 } from 'opencv4nodejs';

export class ImageTool {
    public imageToDouble(rgbImage: Mat) {
        // change image to double type
        return rgbImage.convertTo(CV_64FC3, 1 / 255);
    }

    public imageToUint(rgbImage: Mat) {
        // change image to integer type
        return rgbImage.convertTo(CV_8UC3, 255);
    }

    public convertToMatrix(rgbImage: Mat): number[][][] {
        // get size info
        let rows: number = rgbImage.rows;
        let cols: number = rgbImage.cols;

        // init array
        let source: number[][][] = [];

        // copy
        for (let i = 0; i < rows; i++) {
            let temp: number[][] = [];
            for (let j = 0; j < cols; j++) {
                let pixel = <Vec3><unknown>rgbImage.at(i, j);
                temp.push([pixel.x, pixel.y, pixel.z]);
            }
            source.push(temp);
        }

        // return matrix
        return source;
    }

    public convertToImage(sourceMatrix: number[][][]): Mat {
        // TODO
        return null;
    }
}