export class VectorWithChannels {
    private data: number[][];
    public length: number;
    public channels: number;

    constructor(data?: number[][]) {
        this.data = data;
        this.length = data.length;
        this.channels = data[0].length;
    }
}