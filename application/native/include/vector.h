#ifndef NATIVE_VECTOR_H
#define NATIVE_VECTOR_H

class Vector {
    public:
        int length;
        Vector(int length, double *data);
        ~Vector();
        Vector *zeros(int length);
        void set(int i, double elem);
        double get(int i);
        Vector *add(Vector* vector);
        Vector *sub(Vector* vector);
        Vector *mul(double number);
        double mul(Vector* vector);
        double mod();
        double angle(Vector* vector);

    private:
        double *data;
};

#endif
