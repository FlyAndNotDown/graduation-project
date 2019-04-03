export class MathTool {
    public static mod(x: number, y: number): number {
        return x - y * Math.floor(x / y);
    }
}