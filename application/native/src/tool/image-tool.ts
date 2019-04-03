import { Mat, CV_64FC3 } from 'opencv4nodejs';

export class ImageTool {
    public static image2Double(image: Mat): Mat {
        // convert it
        return image.convertTo(CV_64FC3, 1 / 255);
    }
}