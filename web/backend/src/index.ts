import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as koaBody from 'koa-body';
import * as fs from 'fs';
import * as hash from 'hash.js';
import * as cors from 'koa2-cors';
import { config } from './config';

const server: Koa = new Koa();
const router: Router = new Router();

server.use(async (context, next) => {
    console.log(`[${context.request.method}] ${context.request.url}`);
    await next();
});
server.use(koaBody({
    formidable: {
        maxFileSize: 200 * 1024 * 1024
    }
}));
server.use(cors({
    origin: config.corsOrigin
}));

router
    .post(`${config.urlPrefix}/file/upload`, async (context, next) => {
        console.log(`[${context.request.method}] ${config.urlPrefix}/file/upload`);
        const file = context.request.files.file;
        const reader = fs.createReadStream(file.path);
        const filePath = `${config.uploadPath}/${hash.sha256().update(`${file.name}-${Date.now()}`).digest('hex')}`;
        const writer = fs.createWriteStream(filePath);
        reader.pipe(writer);
        console.log(`file saved to `);
        await next();
    });

server.use(router.routes());

server.listen(config.listenPort);
console.log(`[log] server is running, listen port is ${config.listenPort}`);