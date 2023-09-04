import winston from 'winston';
import 'winston-daily-rotate-file';

const errorTransport = new winston.transports.DailyRotateFile({
  filename: 'application-error-%DATE%.log',
  dirname: 'logs',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  level: 'error',
  maxSize: '20m',
  maxFiles: '14d',
});
const combinedTransport = new winston.transports.DailyRotateFile({
  filename: 'application-%DATE%.log',
  dirname: 'logs',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
});

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  defaultMeta: { service: 'api-test-easy' },
  transports: [new winston.transports.Console(), errorTransport, combinedTransport],
});

export default logger;
