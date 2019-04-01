package pers.kindem.watermark;

public class Watermark {
    private static final int MIN_ARGS_NUM = 10;

    public static boolean checkArgsNum(String[] args) {
        return args.length >= Watermark.MIN_ARGS_NUM;
    }

    public static void main(String[] args) {
        
    }
}
