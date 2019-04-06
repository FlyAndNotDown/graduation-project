export class Matrix2D {
    private data: number[][];

    constructor(data: number[][]) {
        this.data = data;
    }

    public get(i: number, j: number) {
        return this.data[i][j];
    }
}