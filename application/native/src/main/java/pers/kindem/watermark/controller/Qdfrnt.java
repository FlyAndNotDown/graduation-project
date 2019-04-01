package pers.kindem.watermark.controller;

import static org.bytedeco.javacpp.opencv_imgcodecs.imread;
import org.bytedeco.javacpp.opencv_core.Mat;

public class Qdfrnt {
    public static void mark(
            String sourcePath,
            String secretPath,
            String outputPath,
            double transformOrder,
            int transformCycle,
            String randomMatrixType,
            int arnoldOrder,
            double watermarkIntensity
    ) {
        // load images
        Mat sourceImage = imread(sourcePath);
        Mat secretImage = imread(secretPath);

        // TODO
    }
}
