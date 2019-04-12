package model;

public class Vector {
    private double[] data;
    public int length;

    Vector(double[] data) {
        this.data = data;
        this.length = data.length;
    }

    static Vector zeros(int length) {
        double[] data = new double[length];
        for (int i = 0; i < length; i++) {
            data[i] = 0;
        }
        return new Vector(data);
    }

    public double get(int i) {
        return this.data[i];
    }

    public void set(int i, double elem) {
        this.data[i] = elem;
    }

    public Vector copy() {
        Vector result = Vector.zeros(this.length);
        for (int i = 0; i < this.length; i++) {
            result.set(i, this.get(i));
        }
        return result;
    }

    public double[] getData() {
        return data;
    }

    public Vector add(Vector vector) {
        for (int i = 0; i < this.length; i++) {
            this.set(i, this.get(i) + vector.get(i));
        }
        return this;
    }

    public Vector sub(Vector vector) {
        for (int i = 0; i < this.length; i++) {
            this.set(i, this.get(i) - vector.get(i));
        }
        return this;
    }

    public Vector mul(double number) {
        for (int i = 0; i < this.length; i++) {
            this.set(i, this.get(i) * number);
        }
        return this;
    }

    public double mul(Vector vector) {
        double result = 0;
        for (int i = 0; i < this.length; i++) {
            result += this.get(i) * vector.get(i);
        }
        return result;
    }

    public double mod() {
        double sum = 0;
        for (int i = 0; i < this.length; i++) {
            sum += this.get(i) * this.get(i);
        }
        return Math.sqrt(sum);
    }

    public double angle(Vector vector) {
        double factor = 0;
        for (int i = 0; i < this.length; i++) {
            factor += this.get(i) * vector.get(i);
        }
        return Math.acos(factor / (this.mod() * vector.mod()));
    }
}
