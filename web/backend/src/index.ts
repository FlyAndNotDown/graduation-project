import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as koaBody from 'koa-body';
import * as fs from 'fs';
import * as hash from 'hash.js';
import * as cors from 'koa2-cors';
import * as path from 'path';
import { config } from './config';

const server: Koa = new Koa();
const router: Router = new Router();

server.use(async (context, next) => {
    console.log(`[${context.request.method}] ${context.request.url}`);
    await next();
});
server.use(koaBody({
    
    multipart: true,
    formidable: {
        maxFileSize: 2 * 1024 * 1024
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
        const filePart = file.name.split('.');
        const fileExtend = filePart[filePart.length - 1];
        const fileName = `${hash.sha256().update(`${file.name}-${Date.now()}`).digest('hex')}.${fileExtend}`;
        const filePath = path.join(config.uploadPath, fileName);
        const writer = fs.createWriteStream(filePath);
        reader.pipe(writer);
        console.log(`file saved to ${filePath}`);
        context.response.status = 200;
        context.response.body = {
            name: fileName
        };
        await next();
    });

server.use(router.routes());

server.listen(config.listenPort);
console.log(`[log] server is running, listen port is ${config.listenPort}`);