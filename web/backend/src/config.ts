import * as path from 'path';
import * as os from 'os';

interface Config {
    urlPrefix: string,
    staticPath: string,
    uploadPath: string,
    listenPort: number,
    corsOrigin: string,
    executeProgram: string
}

const devMode = true;
export const config: Config = {
    urlPrefix: '/request/watermark',
    staticPath: path.join(__dirname, '../public'),
    uploadPath: path.join(__dirname, '../public/upload'),
    listenPort: 1750,
    corsOrigin: devMode ? 'http://localhost:3000' : 'http://dev.kindemh.cn',
    executeProgram: path.join(__dirname, '..', os.platform() === 'win32' ? 'WATERMARK.exe' : 'WATERMARK')
};