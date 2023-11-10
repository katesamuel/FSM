import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./modules/auth/auth.module";
import { UserModule } from "./modules/user/user.module";
import { RedisModule } from "./shared/redis/redis.module";
import { MongooseModule } from "@nestjs/mongoose";
import { APP_GUARD, Reflector } from "@nestjs/core";
import { JwtAuthGuard } from "./shared/guards/auth.guard";
import { JwtStrategy } from "./shared/jwt/jwt.strategy";
import { RolesGuard } from "./shared/guards/role.guard";
import { BullModule } from '@nestjs/bull';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    RedisModule,
    UserModule,
    // EventModule,
    // EventPlanModule,
    // EventRsvpModule,
    // StripeSubscriptionModule,
    // StripeModule,
    // ScheduleModule.forRoot(),
    // AppNotificationModule,
    ConfigModule.forRoot({ envFilePath: `.env` }),
    MongooseModule.forRoot(
      `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
    ),
    // StripeUsageSchedulerModule,
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST || "localhost",
        port: Number(process.env.REDIS_PORT) || 6379,
      },
    }),
    // BullModule.registerQueue(
    //   { name: NOTIFICATIONS_QUEUE.EMAIL_QUEUE },
    //   { name: NOTIFICATIONS_QUEUE.SMS_QUEUE },
    //   { name: NOTIFICATIONS_QUEUE.WHATSAPP_QUEUE },
    //   { name: NOTIFICATIONS_QUEUE.PUSH_QUEUE }
    // ),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useFactory: (ref) => new JwtAuthGuard(ref),
      inject: [Reflector],
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
