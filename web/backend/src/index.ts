import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as koaBody from 'koa-body';
import * as fs from 'fs';
import * as hash from 'hash.js';
import * as cors from 'koa2-cors';
import * as path from 'path';
import * as koaStatic from 'koa-static';
import { execSync } from 'child_process';
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
server.use(koaStatic(config.staticPath));

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
    })
    .post(`${config.urlPrefix}/mark`, async (context, next) => {
        const body = context.request.body || {};
        const algorithm = body.algorithm || 'qdfrnt';
        const source = body.source || '';
        const sourcePart = source.split('.');
        const sourceExtend = sourcePart[sourcePart.length - 1];
        const output = `${source}-marked.${sourceExtend}`;
        const secret = body.secret || '';
        const matrix = `${source}-matrix.dat`;
        const keys = `${source}-keys.dat`;
        execSync([
            `../${config.executeProgram}`,
            '-t',
            'svm',
            '-a',
            algorithm,
            '-c',
            'mark',
            '-s',
            source,
            '-o',
            output,
            '-e',
            secret,
            '-r',
            matrix,
            '-k',
            keys
        ].join(' '));
        await next();
    });

server.use(router.routes());

server.listen(config.listenPort);
console.log(`[log] server is running, listen port is ${config.listenPort}`);