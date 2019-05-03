import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as koaBody from 'koa-body';
import * as fs from 'fs';
import * as hash from 'hash.js';

interface Config {
    urlPrefix: string,
    uploadPath: string
}

const config: Config = {
    urlPrefix: '/request/watermark',
    uploadPath: '../public/upload'
};

let server: Koa = new Koa();
let router: Router = new Router();

server.use(async (context, next) => {
    console.log(`[${context.request.method}] ${context.request.url}`);
    await next();
});
server.use(koaBody({
    formidable: {
        maxFileSize: 200 * 1024 * 1024
    }
}));

router
    .post(`${config.urlPrefix}/file/upload`, async (context, next) => {
        const file = context.request.files.file;
        const reader = fs.createReadStream(file.path);
        const writer = fs.createWriteStream(`${config.uploadPath}/${hash.sha256().update(`${file.name}-${Date.now()}`).digest('hex')}`);
        // TODO
        await next();
    });

server.use(router.routes());

server.listen(1750);
console.log('[log] server is running');