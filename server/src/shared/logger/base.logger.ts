import { createLogger, transports } from 'winston';
import * as logform from 'logform';
import { LoggerService } from '@nestjs/common';
import { LogOptions } from './options.logger';

const { combine, timestamp, printf } = logform.format;

export class BaseLogger implements LoggerService {
  private static Level = { ERROR: 1, WARN: 2, INFO: 3, DEBUG: 4 };
  private static LEVEL;

  private baseLogger;
  private module;
  private context;

  private directory: string;
  private filename: string;
  private errorFilename: string;
  private exceptionFilename: string;

  constructor(module: string, options?: LogOptions) {
    this.module = module;
    this.initialize(options);
  }

  private initialize(options?: LogOptions) {
    const level = options && options.level ? options.level : 'debug';
    this.handleWriteToFileProperties(options);
    // log level
    switch (level.toString()) {
      case 'error':
        BaseLogger.LEVEL = BaseLogger.Level.ERROR;
        break;
      case 'warn':
        BaseLogger.LEVEL = BaseLogger.Level.WARN;
        break;
      case 'info':
        BaseLogger.LEVEL = BaseLogger.Level.INFO;
        break;
      case 'debug':
        BaseLogger.LEVEL = BaseLogger.Level.DEBUG;
        break;
      default:
        BaseLogger.LEVEL = BaseLogger.Level.INFO;
        break;
    }

    const logOptions = {
      level: level,
      stderrLevels: ['error', 'debug', 'warn'],
    };

    const transportsArray = [];
    transportsArray.push(new transports.Console(logOptions));
    if (options && options.writeToFile === true) {
      transportsArray.push(
        new transports.File({
          level: 'error',
          filename: `${this.directory}/${this.errorFilename}`,
        }),
      );

      const fileOptions = {
        level: level,
        filename: `${this.directory}/${this.filename}`,
      };

      transportsArray.push(new transports.File(fileOptions));
    }

    this.baseLogger = createLogger({
      format: combine(
        timestamp(),
        printf((nfo) => {
          return `[${nfo.timestamp}] - [${nfo.level}] [${this.module}] [${this.context}] : [${nfo.message}]`;
        }),
      ),
      transports: transportsArray,
    });
    if (options && options.writeToFile) {
      this.baseLogger.exceptions.handle(
        new transports.File({
          filename: `${this.directory}/${this.exceptionFilename}`,
        }),
      );
    } else {
      this.baseLogger.exceptions.handle(new transports.Console());
    }
  }

  private handleWriteToFileProperties(options?: LogOptions) {
    if (options && options.writeToFile) {
      if (!this.filename) {
        this.filename = this.module.toString().toLowerCase();
      }

      if (this.filename.indexOf('.') != -1) {
        this.filename = options.fileName.substr(
          0,
          options.fileName.lastIndexOf('.'),
        );
      }

      this.errorFilename = `${this.filename}-errors.log`;
      this.exceptionFilename = `${this.filename}-exceptions.log`;
      this.filename = `${this.filename}.log`;
      this.directory = `${options.directory || './logs'}/${this.module
        .toString()
        .toLowerCase()}`;
    }
  }

  public error(msg: string, trace?: string, context?: string): void {
    if (BaseLogger.LEVEL >= BaseLogger.Level.ERROR) {
      this.context = context || '';
      this.baseLogger.error(msg);
    }
  }

  public warn(msg: string, context?: string): void {
    if (BaseLogger.LEVEL >= BaseLogger.Level.WARN) {
      this.context = context || '';
      this.baseLogger.warn(msg);
    }
  }

  public log(msg: string, context?: string): void {
    if (BaseLogger.LEVEL >= BaseLogger.Level.INFO) {
      this.context = context || '';
      this.baseLogger.info(msg);
    }
  }

  public debug(msg: string, context?: string): void {
    if (BaseLogger.LEVEL >= BaseLogger.Level.DEBUG) {
      this.context = context || '';
      this.baseLogger.debug(msg);
    }
  }
}
