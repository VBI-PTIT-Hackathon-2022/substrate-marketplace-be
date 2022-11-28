import { Logger } from '@nestjs/common';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { ILog } from './log.interface';

const { label, printf } = winston.format;

const loggerFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});
export class CommonLogger extends Logger {
  private winstonLogger: winston.Logger;

  constructor(context?: string) {
    super(context);
    const winstonTransports = new winston.transports.DailyRotateFile({
      filename: '%DATE%.log',
      dirname: './logs/',
      datePattern: 'YYYY-MM-DD',
      maxSize: '10m',
      maxFiles: '7d',
      format: winston.format.combine(
        label({ label: context || 'COMMON' }),
        winston.format.timestamp(),
        loggerFormat,
      ),
    });
    this.winstonLogger = winston.createLogger({
      transports: winstonTransports,
    });
  }

  customError(message: string, trace: string, log: ILog) {
    this.winstonLogger.error(message, log);
    super.error(message, trace);
  }

  customInfo(message: string) {
    this.winstonLogger.info(message);
    super.log(message);
  }
}
