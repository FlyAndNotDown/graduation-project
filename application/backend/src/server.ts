import { Log } from './tool/log';
import * as Koa from 'koa';
import * as Router from 'koa-router';
import { serverConfig } from './config';

export class Server {
    private server: any;
    private router: any;
    
    constructor() {}

    private init(): void {
        Log.log('server was init.');

        this.server = new Koa();
        this.server.keys = serverConfig.keys;
        this.router = new Router();
    }

    private loadController(): void {}

    private loadMiddleware(): void {}

    private listen(): void {}

    public start() {
        this.init();
        this.loadMiddleware();
        this.loadController();
        this.listen();
        
        Log.log('server is running ...');

        return this;
    }
}