package model;

public class Matrix2D {
    public enum ConvertToVectorArrayType {
        ROW_AS_VECTOR,
        COL_AS_VECTOR
    }
    public enum RestoreFromVectorArrayType {
        ROW_AS_VECTOR,
        COL_AS_VECTOR
    }

    private double[][] data;
    public int rows;
    public int cols;

    Matrix2D(double[][] data) {
        this.data = data;
        this.rows = data.length;
        this.cols = data[0].length;
    }

    public static Matrix2D zeros(int rows, int cols) {
        double[][] temp = new double[rows][cols];
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                temp[i][j] = 0;
            }
        }
        return new Matrix2D(temp);
    }

    public static Matrix2D diagonal(Vector elements) {
        Matrix2D result = Matrix2D.zeros(elements.length, elements.length);
        for (int i = 0; i < elements.length; i++) {
            result.set(i, i, elements.get(i));
        }
        return result;
    }

    public double get(int i, int j) {
        return this.data[i][j];
    }

    public void set(int i, int j, double elem) {
        this.data[i][j] = elem;
    }

    public double[][] getData() {
        return this.data;
    }

    public Matrix2D copy() {
        Matrix2D result = Matrix2D.zeros(this.rows, this.cols);
        for (int i = 0; i < this.rows; i++) {
            for (int j = 0; j < this.cols; j++) {
                result.set(i, j, this.get(i, j));
            }
        }
        return result;
    }

    public Matrix2D transport() {
        Matrix2D result = Matrix2D.zeros(this.cols, this.rows);
        for (int i = 0; i < result.rows; i++) {
            for (int j = 0; j < result.cols; j++) {
                result.set(i, j, this.get(j, i));
            }
        }
        return result;
    }

    public Matrix2D add(Matrix2D matrix2D) {
        Matrix2D result = Matrix2D.zeros(this.rows, this.cols);
        for (int i = 0; i < result.rows; i++) {
            for (int j = 0; j < result.cols; j++) {
                result.set(i, j, this.get(i, j) + matrix2D.get(i, j));
            }
        }
        return result;
    }

    public Matrix2D mul(Matrix2D matrix2D) {
        Matrix2D result = Matrix2D.zeros(this.rows, matrix2D.cols);
        for (int i = 0; i < result.rows; i++) {
            for (int j = 0; j < result.cols; j++) {
                double sum = 0;
                for (int k = 0; k < this.cols; k++) {
                    sum += this.get(i, k) + matrix2D.get(k, j);
                }
                result.set(i, j, sum);
            }
        }
        return result;
    }

    public Matrix2D eigenVectors() {
        double precision = 0.0001f;
        int iterationTime = 10;
        int dimension = this.rows;

        Matrix2D matrix = this.copy();
        double[] diagSource = new double[dimension];
        for (int i = 0; i < dimension; i++) {
            diagSource[i] = 1;
        }
        Matrix2D eigVectors = Matrix2D.diagonal(new Vector(diagSource));

        int count = 0;
        while (true) {
            double max = Math.abs(matrix.get(0, 1));
            int row = 0;
            int col = 1;
            for (int i = 0; i < dimension; i++) {
                for (int j = 0; j < dimension; j++) {
                    double temp = Math.abs(matrix.get(i, j));
                    if (i != j && temp > max) {
                        max = temp;
                        row = i;
                        col = j;
                    }
                }
            }

            if (max < precision || count > iterationTime) { break; }
            count++;

            double app = matrix.get(row, row);
            double apq = matrix.get(row, col);
            double aqq = matrix.get(col, col);
            double angle = 0.5 * Math.atan2(-2 * apq, aqq - app);
            double sin = Math.sin(angle);
            double cos = Math.cos(angle);
            double sin2 = Math.sin(2 * angle);
            double cos2 = Math.cos(2 * angle);
            matrix.set(row, row, app * cos * cos + aqq * sin * sin + 2 * apq * cos * sin);
            matrix.set(col, col, app * sin * sin + aqq * cos * cos - 2 * apq * cos * sin);
            matrix.set(row, col, 0.5 * (aqq - app) * sin2 + apq * cos2);
            matrix.set(col, row, matrix.get(row, col));

            for (int i = 0; i < dimension; i++) {
                if (i != col && i != row) {
                    max = matrix.get(i, row);
                    matrix.set(i, row, matrix.get(i, col) * sin + max * cos);
                    matrix.set(i, col, matrix.get(i, col) * cos - max * sin);
                }
            }

            for (int i = 0; i < dimension; i++) {
                if (i != col && i != row) {
                    max = matrix.get(row, i);
                    matrix.set(row, i, matrix.get(col, i) * sin + max * cos);
                    matrix.set(col, i, matrix.get(col, i) * cos - max * sin);
                }
            }

            for (int i = 0; i < dimension; i++) {
                max = eigVectors.get(i, row);
                eigVectors.set(i, row, eigVectors.get(i, col) * sin + max * cos);
                eigVectors.set(i, col, eigVectors.get(i, col) * cos - max * sin);
            }
        }

        return eigVectors;
    }

    public Vector[] convertToVectorArray(ConvertToVectorArrayType type) {
        Vector[] result;
        switch (type) {
            case ROW_AS_VECTOR:
                result = new Vector[this.rows];
                for (int i = 0; i < this.rows; i++) {
                    result[i] = Vector.zeros(this.cols);
                    for (int j = 0; j < this.cols; j++) {
                        result[i].set(j, this.get(i, j));
                    }
                }
                return result;
            case COL_AS_VECTOR:
                result = new Vector[this.cols];
                for (int i = 0; i < this.cols; i++) {
                    result[i] = Vector.zeros(this.rows);
                    for (int j = 0; j < this.rows; j++) {
                        result[i].set(j, this.get(j, i));
                    }
                }
                return result;
            default:
                return new Vector[0];
        }
    }

    public static Matrix2D restoreFromVectorArray(RestoreFromVectorArrayType type, Vector[] vectors) {
        Matrix2D result;
        switch (type) {
            case ROW_AS_VECTOR:
                result = Matrix2D.zeros(vectors.length, vectors[0].length);
                for (int i = 0; i < result.rows; i++) {
                    for (int j = 0; j < result.cols; j++) {
                        result.set(i, j, vectors[i].get(j));
                    }
                }
                return result;
            case COL_AS_VECTOR:
                result = Matrix2D.zeros(vectors[0].length, vectors.length);
                for (int i = 0; i < result.rows; i++) {
                    for (int j = 0; j < result.cols; j++) {
                        result.set(i, j, vectors[j].get(i));
                    }
                }
            default:
                return Matrix2D.zeros(0, 0);
        }
    }

    public Matrix2D orthogonal() {
        Vector[] vectors = this.convertToVectorArray(ConvertToVectorArrayType.COL_AS_VECTOR);
        Vector[] resultSource = new Vector[vectors.length];

        for (int i = 0; i < vectors.length; i++) {
            Vector temp = vectors[i].copy();
            for (int j = 0; j < i; j++) {
                temp = temp.sub(resultSource[j].mul(vectors[i].mul(resultSource[j]) / resultSource[j].mul(resultSource[j])));
            }
            resultSource[i] = temp;
        }

        for (int i = 0; i < resultSource.length; i++) {
            double sum = 0;
            for (int j = 0; j < resultSource[i].length; j++) {
                sum += resultSource[i].get(j) * resultSource[i].get(j);
            }
            sum = Math.sqrt(sum);
            for (int j = 0; j < resultSource[i].length; j++) {
                resultSource[i].set(j, resultSource[i].get(j) / sum);
            }
        }

        return Matrix2D.restoreFromVectorArray(RestoreFromVectorArrayType.COL_AS_VECTOR, resultSource);
    }
}
