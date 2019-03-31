import * as KeyGrip from 'keygrip';

interface MainConfig {
    devMode: boolean,
    log: boolean
}
interface ControllerConfig {
    commonUrlPrefix: string
}
interface MiddlewareConfig {
    cors: {
        origin: string,
        credentials: boolean
    },
    session: {
        key: string,
        maxAge: number,
        autoCommit: boolean,
        overwrite: boolean,
        httpOnly: boolean,
        signed: boolean,
        rolling: boolean,
        renew: boolean
    }
}
interface ServerConfig {
    listenPort: number,
    keys: KeyGrip
}

// this is config, overwrite it here
export const mainConfig: MainConfig = {
    devMode: true,
    log: true
};
export const controllerConfig: ControllerConfig = {
    commonUrlPrefix: '/request/watermark'
}
export const middlewareConfig: MiddlewareConfig = mainConfig.devMode ? {
    cors: {
        origin: 'http://localhost:20000',
        credentials: true
    },
    session: {
        key: 'sessionid',
        maxAge: 1000 * 60 * 60 * 24 * 7,
        autoCommit: true,
        overwrite: true,
        httpOnly: true,
        signed: true,
        rolling: false,
        renew: false
    }
} : {
    cors: {
        origin: 'http://134.175.59.165',
        credentials: true
    },
    session: {
        key: 'sessionid',
        maxAge: 1000 * 60 * 60 * 24 * 7,
        autoCommit: true,
        overwrite: true,
        httpOnly: true,
        signed: true,
        rolling: false,
        renew: false
    }
}
export const serverConfig: ServerConfig = mainConfig.devMode ? {
    listenPort: 30000,
    keys: new KeyGrip(['Color Images Watermark System'], 'sha256')
} : {
    listenPort: 30000,
    keys: new KeyGrip(['Color Images Watermark System'], 'sha256')
}