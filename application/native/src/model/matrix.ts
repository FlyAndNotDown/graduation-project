export class Matrix {
    public dimension: number;
    public data: number[][] | number[][][];

    constructor(data: number[][] | number[][][]) {
        if (data[0].length === 0 || typeof data[0][0] === 'number') { this.dimension = 2; }
        else { this.dimension = 3; }
        this.data = data;
    }

    public transport(): number[][] {
        if (this.dimension === 3) { throw new Error('matrix with three dimension can\'t be transport'); }

        // get size info
        let rows: number = this.data.length;
        let cols: number = this.data[0].length;

        // init result
        let result: number[][] = [];

        // transport
        for (let i: number = 0; i < cols; i++) {
            let temp: number[] = [];
            for (let j: number = 0; j < rows; j++) {
                temp.push((<number[][]>this.data)[j][i]);
            }
            result.push(temp);
        }

        // return result
        return result;
    }
}