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

    public copy(): Vector {
        let result: Vector = Vector.zeros(this.length);
        for (let i: number = 0; i < result.length; i++) {
            result.set(i, this.get(i));
        }
        return result;
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

    public add(other: Vector): Vector {
        if (this.length !== other.length) {
            throw new Error('two vector should have the save length');
        }
        
        let result: Vector = Vector.zeros(this.length);
        for (let i: number = 0; i < this.length; i++) {
            result.set(i, this.get(i) + other.get(i));
        }

        return result;
    }

    public sub(other: Vector): Vector {
        if (this.length !== other.length) {
            throw new Error('two vector should have the save length');
        }

        let result: Vector = Vector.zeros(this.length);
        for (let i: number = 0; i < this.length; i++) {
            result.set(i, this.get(i) - other.get(i));
        }

        return result;
    }

    public mod(): number {
        let sum: number = 0;
        for (let i: number = 0; i < this.length; i++) {
            sum += this.get(i) * this.get(i);
        }
        return Math.sqrt(sum);
    }

    public angle(other: Vector): number {
        if (this.length !== other.length) {
            throw new Error('length of two vector should be equal');
        }

        let factor: number = 0;
        for (let i: number = 0; i < this.length; i++) {
            factor += this.get(i) * other.get(i);
        }

        return factor / (this.mod() * other.mod());
    }
}