/**
 * 可控制的日志系统
 * 根据环境和设置控制日志输出
 */

export enum LogLevel {
    DEBUG = 0,
    INFO = 1,
    WARN = 2,
    ERROR = 3,
    NONE = 4
}

export class Logger {
    private static instance: Logger;
    private logLevel: LogLevel = LogLevel.ERROR; // 默认只显示错误
    private isDevelopment: boolean = false;

    private constructor() {
        // 检测是否为开发环境 (在Obsidian环境中简化处理)
        // 可以通过设置来控制调试模式
        this.isDevelopment = false;
    }

    public static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    public setLogLevel(level: LogLevel): void {
        this.logLevel = level;
    }

    public debug(message: string, ...args: any[]): void {
        if (this.logLevel <= LogLevel.DEBUG) {
            console.log(`[SmartReader][DEBUG] ${message}`, ...args);
        }
    }

    public info(message: string, ...args: any[]): void {
        if (this.logLevel <= LogLevel.INFO) {
            console.info(`[SmartReader][INFO] ${message}`, ...args);
        }
    }

    public warn(message: string, ...args: any[]): void {
        if (this.logLevel <= LogLevel.WARN) {
            console.warn(`[SmartReader][WARN] ${message}`, ...args);
        }
    }

    public error(message: string, ...args: any[]): void {
        if (this.logLevel <= LogLevel.ERROR) {
            console.error(`[SmartReader][ERROR] ${message}`, ...args);
        }
    }
}

// 导出单例实例
export const logger = Logger.getInstance(); 