/**
 * @author ThanhBN
 * @summary VMO custom central log
 * @description The VMO product development team has built a unified set of common log data transfer centers with lots of features,
 * * Status: coming soon
 */

import * as winston from 'winston';
import * as moment from 'moment-timezone';
moment().tz('Asia/Ho_Chi_Minh').format();

const getTimeVietNamHCM = () => {
  return moment().format('YYYY-MM-DD hh:mm:ss');
};
const { combine, timestamp, label, printf } = winston.format;

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};
winston.addColors(colors);

// tslint:disable-next-line:no-shadowed-variable
const formatLog = printf(({ label, level, message }) => {
  return `${label} [${level.toUpperCase()}]: ${message}`;
});

const transports = [new winston.transports.Console()];
export class Logger {
  public static log(
    data?: string,
    level = 'info',
    method?: string,
    path?: string,
    status?: string,
  ) {
    let logLabel = `[${getTimeVietNamHCM()}]`;
    if (status) {
      logLabel += ` [${status}]`;
    }
    if (method) {
      logLabel += ` [${method}]`;
    }
    if (path) {
      logLabel += ` [${path}]`;
    }
    const logger = winston.createLogger({
      format: combine(
        timestamp(),
        winston.format.prettyPrint(),
        winston.format.metadata(),
        winston.format.json(),
        label({ label: logLabel }),
        formatLog,
      ),
      transports,
    });
    logger.log({
      level,
      message: data,
    });
    // logger.close();
  }
}
