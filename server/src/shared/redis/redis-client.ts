/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import redis = require('redis');

@Injectable()
export class RedisClient {
  private readonly _client;
  private readonly _logger = new Logger(RedisClient.name);
  constructor() {
    const redisHost = process.env.REDIS_HOST;
    const redisPort = Number(process.env.REDIS_PORT);
    this._client = redis.createClient({
      socket: {
        port: redisPort,
        host: redisHost,
      }
    });

    (async () => {
      await this._client.connect();
    })();

    this._client.on('connect', () => {
      this._logger.log(`Redis started on ${redisHost}:${redisPort}`);
    });

    this._client.on("error", (error) => {
      this._logger.error(
        `error event - ${redisHost}:${redisPort} - ${error}`,
      );
    });

    this._client.on('reconnecting', () => {
      this._logger.log(`Redis re-started on ${redisHost}:${redisPort}`);
    });
  }
  get Client() {
    return this._client;
  }
}
