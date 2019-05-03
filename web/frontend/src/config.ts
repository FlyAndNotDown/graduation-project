export interface Config {
    devMode: boolean,
    urlPrefix: string
}

const devMode = true;
export const config: Config = {
    devMode: devMode,
    urlPrefix: devMode ? 'http://localhost:1750/request/watermark' : '/request/watermark'
};
