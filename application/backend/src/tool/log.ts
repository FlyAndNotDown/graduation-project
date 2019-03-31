import { mainConfig } from "../config";


export class Log {
    public static log(content: string, detail: string & Error & Object): void {
        if (mainConfig.log) {
            console.log(`[log] ${content}`);
            if (mainConfig.devMode && typeof detail === 'object') {
                return console.log(detail.stack);
            }
            let lines: string[] = detail.split('\n');
            lines.forEach((line: string): void => { console.log(`      ${line}`); });
        }
    }

    public static error(content: string, detail: string & Error): void {
        if (mainConfig.log) {
            console.log(`[err] ${content}`);
            if (mainConfig.devMode && typeof detail === 'object') {
                return console.log(detail.stack);
            }
            let lines: string[] = detail.split('\n');
            lines.forEach((line: string): void => { console.log(`      ${line}`); });
        }
    }

    public static dev(content: string, detail: string & Error): void {
        if (mainConfig.log && mainConfig.devMode) {
            console.log(`[log] ${content}`);
            if (mainConfig.devMode && typeof detail === 'object') {
                return console.log(detail.stack);
            }
            let lines: string[] = detail.split('\n');
            lines.forEach((line: string): void => { console.log(`      ${line}`); });
        }
    }

    public static devError(content: string, detail: string & Error): void {
        if (mainConfig.log && mainConfig.devMode) {
            console.log(`[err] ${content}`);
            if (mainConfig.devMode && typeof detail === 'object') {
                return console.log(detail.stack);
            }
            let lines: string[] = detail.split('\n');
            lines.forEach((line: string): void => { console.log(`      ${line}`); });
        }
    }
}