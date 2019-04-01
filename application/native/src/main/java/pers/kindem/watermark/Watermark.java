package pers.kindem.watermark;

import pers.kindem.watermark.controller.Qdfrnt;
import pers.kindem.watermark.tool.LogTool;

public class Watermark {
    // const
    private static final int MIN_ARGS_NUM = 2;

    private static void printHelp() {
        LogTool.free("Tip: [] is params you must input, and <> is params which is optional");
        LogTool.free("Usage:");
        LogTool.free(" - watermark mark [algorithmType] <otherParams>");
        LogTool.free(" - watermark train <otherParams>");
        LogTool.free(" - watermark restore [algorithmType] <otherParams>");
        LogTool.free("\t you can see document at https://github.com/FlyAndNotDown/graduation-project for more detail");
    }

    public static void main(String[] args) {
        // check arg num
        if (args.length < Watermark.MIN_ARGS_NUM) {
            LogTool.error("too many arguments");
            return;
        }

        // get program run type
        String runType = args[0];
        switch (runType) {
            case "mark":
                // get algorithm algorithmType
                String algorithmType = args[1];
                switch (algorithmType) {
                    case "qdfrnt":
                        // get other params
                        String sourcePath = "./source.jpg";
                        String secretPath = "./secret.jpg";
                        String outputPath = "./output.jpg";
                        double transformOrder = 0.75;
                        int transformCycle = 10;
                        String randomMatrixType = "default";
                        int arnoldOrder = 4;
                        double watermarkIntensity = 0.05;
                        if (args.length >= 3) { sourcePath = args[2]; }
                        if (args.length >= 4) { secretPath = args[3]; }
                        if (args.length >= 5) { outputPath = args[4]; }
                        if (args.length >= 6) { transformOrder = Double.valueOf(args[5]); }
                        if (args.length >= 7) { transformCycle = Integer.valueOf(args[6]); }
                        if (args.length >= 8) { randomMatrixType = args[7]; }
                        if (args.length >= 9) { arnoldOrder = Integer.valueOf(args[8]); }
                        if (args.length >= 10) { watermarkIntensity = Double.valueOf(args[9]); }

                        // call qdfrnt mark function
                        Qdfrnt.mark(sourcePath, secretPath, outputPath, transformOrder, transformCycle, randomMatrixType, arnoldOrder, watermarkIntensity);
                        break;
                    case "qdfrft":
                        // TODO
                        break;
                    default:
                        LogTool.error("unknown algorithm algorithmType: " + algorithmType);
                        printHelp();
                        break;
                }
                break;
            case "train":
                // TODO
                break;
            case "restore":
                // TODO
                break;
            case "help":
                printHelp();
                break;
            default:
                LogTool.error("unknown run type: " + runType);
                break;
        }
    }
}
