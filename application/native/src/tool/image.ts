import { Mat, CV_64FC3, CV_8UC3, Vec3 } from 'opencv4nodejs';

export class ImageTool {
    public static imageToDouble(image: Mat) {
        // change image to double type
        return image.convertTo(CV_64FC3, 1 / 255);
    }

    public static imageToUint(image: Mat) {
        // change image to integer type
        return image.convertTo(CV_8UC3, 255);
    }

    public static convertToMatrix(image: Mat): number[][][] {
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
        return matrix;
    }

    public static convertToImage(matrix: number[][][]): Mat {
        // get size info
        let rows: number = matrix.length;
        let cols: number = matrix[0].length;
        
        // init image mat
        let image: Mat = new Mat(rows, cols, CV_64FC3);

        // copy
        for (let i: number = 0; i < rows; i++) {
            for (let j: number = 0; j < cols; j++) {
                let pixel: number[] = matrix[i][j];
                image.set(i, j, new Vec3(pixel[0], pixel[1], pixel[2]));
            }
        }

        // return
        return image;
    }
}