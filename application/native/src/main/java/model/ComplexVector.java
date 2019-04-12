package model;

public class ComplexVector {
    private Complex[] data;
    public int length;

    ComplexVector(Complex[] data) {
        this.data = data;
        this.length = data.length;
    }

    public static ComplexVector zeros(int length) {
        Complex[] complexes = new Complex[length];
        for (int i = 0; i < length; i++) {
            complexes[i] = new Complex(0, 0);
        }
        return new ComplexVector(complexes);
    }

    public Complex get(int i) {
        return this.data[i];
    }

    public void set(int i, Complex elem) {
        this.data[i] = elem;
    }

    public Complex[] getData() {
        return this.data;
    }
}
