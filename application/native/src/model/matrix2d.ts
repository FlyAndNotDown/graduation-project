export class Matrix2D {
    private data: number[][];
    public rows: number;
    public cols: number;

    constructor(data: number[][]) {
        this.data = data;
        this.rows = data.length;
        this.cols = data[0].length;
    }

    public static zeros(rows: number, cols: number): Matrix2D {
        let data: number[][] = [];
        for (let i: number = 0; i < rows; i++) {
            let row: number[] = [];
            for (let j: number = 0; j < cols; j++) {
                row.push(0);
            }
            data.push(row);
        }
        return new Matrix2D(data);
    }

    public get(i: number, j: number): number {
        return this.data[i][j];
    }

    public set(i: number, j: number, item: number): void {
        this.data[i][j] = item;
    }

    public getData(): number[][] {
        return this.data;
    }
}