export class MathTool {
    public static mod(x: number, y: number): number {
        // get mod and return
        return x - y * Math.floor(x / y);
    }

    public static getRandomMatrix(length: number): number[][] {
        // init result
        let result: number[][] = [];

        // random
        for (let i: number = 0; i < length; i++) {
            let temp: number[] = [];
            for (let j: number = 0; j < length; j++) {
                temp.push(Math.random());
            }
            result.push(temp);
        }

        // return result
        return result;
    }
}