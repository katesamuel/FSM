import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { JwtStrategy } from './../../shared/jwt/jwt.strategy';
import { MemberModule } from '../member/member.module';
import EmailTask from '../../shared/external-notification/email.task';
import SmsTask from '../../shared/external-notification/sms.task';

@Module({
  imports: [
    MemberModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '12h' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, EmailTask, SmsTask],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
