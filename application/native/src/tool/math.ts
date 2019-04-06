export class MathTool {
    public static mod(x: number, y: number): number {
        // return result
        return x - Math.floor(x / y) * y;
    }

    public static rem(x: number, y: number): number {
        // return result
        return x % y;
    }

    public static getRandomMatrix(length: number): number[][] {
        // init result
        let matrix: number[][] = [];

        // generate random number
        for (let i: number = 0; i < length; i++) {
            let row: number[] = [];
            for (let j: number = 0; j < length; j++) {
                row.push(Math.random());
            }
            matrix.push(row);
        }

        // return result
        return matrix;
    }
}