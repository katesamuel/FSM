import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { BaseLogger } from './shared/logger/base.logger';
import { LogOptions } from './shared/logger/options.logger';
import { MongoExceptionFilter } from './shared/utils/mongo-exception-filter';
import helmet from 'helmet';
import { NestExpressApplication } from '@nestjs/platform-express';

export class Bootstraper {
  async bootstrap() {
    /** Logging Options **/
    const logOptions: LogOptions = new LogOptions();
    logOptions.directory = process.env.LOG_DIRECTORY || './logs';
    logOptions.fileName = process.env.LOG_FILE_NAME || 'churchbell-service.log';
    logOptions.writeToFile = process.env.LOG_WRITE_TO_FILE === 'true' || false;
    logOptions.level = process.env.LOG_LEVEL || 'debug';
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
      rawBody: true,
      logger: new BaseLogger('ChurchBell-Service', logOptions),
    });
    app.useBodyParser('text');
    app.useBodyParser('json', { limit: '2mb' });
    /** App Server **/
    const globalPrefix = 'internal-api';
    app.use(helmet());
    app.setGlobalPrefix(globalPrefix);
    app.useGlobalPipes(
      new ValidationPipe({
        transformOptions: {
          enableImplicitConversion: true, // allow conversion underneath
        },
      }),
    );
    app.useGlobalFilters(new MongoExceptionFilter());
    const logger = new Logger(Bootstraper.name);
    const port = process.env.PORT || 3000;
    await app.listen(port, () => {
      logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
    });
  }
}

const bootstrapper = new Bootstraper();
bootstrapper.bootstrap();
