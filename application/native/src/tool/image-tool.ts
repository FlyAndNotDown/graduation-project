import { MathTool } from './math-tool';
import { Mat, CV_64FC3 } from 'opencv4nodejs';

export class ImageTool {
    public static image2Double(image: Mat): Mat {
        // convert it
        return image.convertTo(CV_64FC3, 1 / 255);
    }

    public static arnoldTransform(image: Mat, order: number): Mat {
        // get size info
        let rows: number = image.rows;

        // init output
        let output: Mat = image.copy();

        // do arnold transform
        for (let i = 0; i < order; i++) {
            let temp: Mat = output.copy();
            for (let j = 0; j < rows; j++) {
                for (let k = 0; k < rows; k++) {
                    let x: number = MathTool.mod(j + k, rows);
                    let y: number = MathTool.mod(j + 2 * k, rows);
                    output.set(y, x, temp.at(k, j));
                }
            }
            temp = output.copy();
        }

        // return result
        return output;
    }
}