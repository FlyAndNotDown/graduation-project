import { mainConfig } from "../config";


export class Log {
    public static log(context: string, detail?: Error & string): void {
        if (mainConfig.log) {
            console.log(`[log] ${context}`);
            if (detail) {
                if (typeof detail === 'object') {
                    return console.log(detail.stack);
                }
                if (typeof detail === 'string') {
                    let lines: string[] = detail.split('\n');
                    return lines.forEach((line: string): void => { console.log(`      ${line}`); });
                }
            }
        }
    }

    public static error(context: string, detail?: Error & string): void {
        if (mainConfig.log) {
            console.log(`[error] ${context}`);
            if (detail) {
                if (typeof detail === 'object') {
                    return console.log(detail.stack);
                }
                if (typeof detail === 'string') {
                    let lines: string[] = detail.split('\n');
                    return lines.forEach((line: string): void => { console.log(`      ${line}`); });
                }
            }
        }
    }

    public static dev(context: string, detail?: Error & string): void {
        if (mainConfig.log && mainConfig.devMode) {
            console.log(`[log] ${context}`);
            if (detail) {
                if (typeof detail === 'object') {
                    return console.log(detail.stack);
                }
                if (typeof detail === 'string') {
                    let lines: string[] = detail.split('\n');
                    return lines.forEach((line: string): void => { console.log(`      ${line}`); });
                }
            }
        }
    }

    public static devError(context: string, detail?: Error & string): void {
        if (mainConfig.log && mainConfig.devMode) {
            console.log(`[error] ${context}`);
            if (detail) {
                if (typeof detail === 'object') {
                    return console.log(detail.stack);
                }
                if (typeof detail === 'string') {
                    let lines: string[] = detail.split('\n');
                    return lines.forEach((line: string): void => { console.log(`      ${line}`); });
                }
            }
        }
    }
}