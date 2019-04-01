package pers.kindem.watermark;

public class Main {
    public static void main(String[] args) {
        // define params and give it default value
        String type = "qdfrnt";

        // get params
        for(int i = 0; i < args.length; i++) {
            if (args[i].equals("-type") || args[i].equals("-t")) {
                if (i + 1 >= args.length) { printErrorReasonAntUsage("error params"); return; }
                if (args[i + 1].equals(("qdfrnt"))) { type = "qdfrnt"; }
                if (args[i + 1].equals("qfrft")) { type = "qdfrft"; }
            }
        }
    }

    private static void printErrorReasonAntUsage(String error) {
        System.out.println("[err]" + error);
        System.out.println("Usage: program -[paramKey] [paramValue]");
        System.out.println("\t-type [qdfrnt|qdfrft] --- type of algorithm");
    }
}
