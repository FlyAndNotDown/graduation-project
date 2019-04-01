package pers.kindem.watermark.model;

// JavaBeans - command line arguments
public class Arguments {
    // public define
    public enum Type { QDFRNT, QDFrFT };

    // model
    private Type type;
    private String imgPath;

    // constructor
    Arguments() {
        this.type = Type.QDFRNT;
        this.imgPath = "";
    }

    Arguments(Arguments.Type type, String imgPath) {
        this.type = type;
        this.imgPath = imgPath;
    }

    // getter & setter
    public void setType(Arguments.Type type) {
        this.type = type;
    }
    
    public void setImgPath(String imgPath) {
        this.imgPath = imgPath;
    }

    public Arguments.Type getType() {
        return this.type;
    }

    public String getImgPath() {
        return this.imgPath;
    }
}