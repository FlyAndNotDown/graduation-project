export class Vector {
    private data: number[];
    public length: number;

    constructor(data?: number[]) {
        this.data = data;
        this.length = data.length;
    }

    public static zeros(length: number): Vector {
        let data: number[] = [];
        for (let i: number = 0; i < length; i++) {
            data.push(0);
        }
        return new Vector(data);
    }

    public get(i: number): number {
        return this.data[i];
    }

    public set(i: number, item: number): void {
        this.data[i] = item;
    }

    public getData(): number[] {
        return this.data;
    }
}