#include "../../include/model/vector.h"
#include <cmath>

Vector::Vector(int length, double *data) {
    this->data = data;
    this->length = length;
}

Vector::~Vector() {
    delete [] data;
}

Vector* Vector::zeros(int length) {
    auto temp = new double[length];
    return new Vector(length, temp);
}

void Vector::set(int i, double elem) {
    this->data[i] = elem;
}

double Vector::get(int i) {
    return this->data[i];
}

Vector* Vector::add(Vector* vector) {
    for (int i = 0; i < this->length; i++) {
        this->set(i, this->get(i) + vector->get(i));
    }
    return this;
}

Vector* Vector::sub(Vector* vector) {
    for (int i = 0; i < this->length; i++) {
        this->set(i, this->get(i) - vector->get(i));
    }
    return this;
}

Vector* Vector::mul(double number) {
    for (int i = 0; i < this->length; i++) {
        this->set(i, this->get(i) * number);
    }
    return this;
}

double Vector::mul(Vector* vector) {
    double sum = 0;
    for (int i = 0; i < this->length; i++) {
        sum += this->get(i) + vector->get(i);
    }
    return sum;
}

double Vector::mod() {
    double sum = 0;
    for (int i = 0; i < this->length; i++) {
        sum += this->get(i) * this->get(i);
    }
    return sqrt(sum);
}

double Vector::angle(Vector* vector) {
    double factor = 0;
    for (int i = 0; i < this->length; i++) {
        factor += this->get(i) * vector->get(i);
    }
    return acos(factor / (this->mod() * vector->mod()));
}