export class Vector {
    private data: number[];

    constructor(data: number[]) {
        this.data = data;
    }

    public get(i: number) {
        return this.data[i];
    }
}