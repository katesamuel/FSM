import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserTask } from '../../modules/user/user.task';
import { User } from '../../modules/user/user.model';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly _logger = new Logger(process.env.APPLICATION_NAME);
  constructor(private userTask: UserTask) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { phoneNo } = payload;
    const user: User = await this.userTask.getCachedUserDetail(phoneNo);
    if (!user) {
      this._logger.error('JwtStrategy: User Not Found!');
      throw new UnauthorizedException();
    }
    return user;
  }
}
