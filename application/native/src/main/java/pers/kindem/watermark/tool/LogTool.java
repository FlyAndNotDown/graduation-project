package pers.kindem.watermark.tool;

public class LogTool {
    public static void log(String content) {
        System.out.println("[log] " + content);
    }

    public static void log(String content, String detail) {
        System.out.println("[log] " + content);
        System.out.println(detail);
    }

    public static void error(String content) {
        System.out.println("[err] " + content);
    }

    public static void error(String content, Exception e) {
        System.out.println("[err] " + content);
        e.printStackTrace();
    }

    public static void free(String content) {
        System.out.println(content);
    }
}