package pers.kindem.watermark;

import pers.kindem.watermark.tool.LogTool;

public class Watermark {
    // const
    private static final int MIN_ARGS_NUM = 2;

    public static void main(String[] args) {
        // check arg num
        if (args.length < Watermark.MIN_ARGS_NUM) {
            LogTool.error("too many arguments");
            return;
        }

        // get algorithm type
        String type = args[1];
        if (type.equals("qdfrnt")) {
            // get other params
            String sourcePath;
            String secretPath;
            double transformOrder;
            int transformCycle;
            String randomMatrixType;
            String arnoldOrder;
            double watermarkIntensity;
            // TODO
        } else if (type.equals("qfrft")) {
            return;
        } else {
            LogTool.error("unknown algorithm type: " + type);
        }
    }
}
