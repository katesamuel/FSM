import { Module } from '@nestjs/common';
import { RedisClient } from './redis-client';
import { RedisClientWrapper } from './redis-client-wrapper';

@Module({
  controllers: [],
  providers: [RedisClient, RedisClientWrapper],
  exports: [RedisClient, RedisClientWrapper],
})
export class RedisModule {}
