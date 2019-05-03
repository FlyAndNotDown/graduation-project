export interface Config {
    devMode: boolean,
    urlPrefix: string,
    staticPath: string
}

const devMode = false;
export const config: Config = {
    devMode: devMode,
    urlPrefix: devMode ? 'http://localhost:1750/request/watermark' : '/request/watermark',
    staticPath: devMode ? 'http://localhost:1750/upload' : '/upload'
};
