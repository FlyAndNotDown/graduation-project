import * as path from 'path';

interface Config {
    urlPrefix: string,
    uploadPath: string,
    listenPort: number,
    corsOrigin: string
}

const devMode = true;
export const config: Config = {
    urlPrefix: '/request/watermark',
    uploadPath: path.join(__dirname, '../public/upload'),
    listenPort: 1750,
    corsOrigin: devMode ? 'http://localhost:3000' : 'http://dev.kindemh.cn'
};