import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PassportModule } from '@nestjs/passport';
import { RedisModule } from 'src/shared/redis/redis.module';
import { UserController } from './user.controller';
import { UserSchema } from './user.model';
import { UserService } from './user.service';
import { UserTask } from './user.task';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    RedisModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserTask],
  exports: [UserService, UserTask],
})
export class UserModule {}
