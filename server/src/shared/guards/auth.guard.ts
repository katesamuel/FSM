import { UnauthorizedException, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly _logger = new Logger(process.env.APPLICATION_NAME);
  constructor(private readonly reflector: Reflector) {
    super();
  }

  handleRequest(err, user, info, context) {
    const allowAny = this.reflector.get<string[]>(
      'allow-any',
      context.getHandler(),
    );
    if (user) {
      return user;
    }
    if (allowAny) {
      return null;
    }
    this._logger.error('JwtAuthGuard: Unauthorized');
    throw new UnauthorizedException();
  }
}
