export class MathTool {
    public static mod(x: number, y: number): number {
        // return result
        return x - Math.floor(x / y) * y;
    }

    public static rem(x: number, y: number): number {
        // return result
        return x % y;
    }
}