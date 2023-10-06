import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth2';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: 'CLIENT_ID', // <- Replace this with your client id
      clientSecret: 'CLIENT_SECRET', // <- Replace this with your client secret
      callbackURL: 'http://localhost:3000/auth/google/callback',
      passReqToCallback: true,
      scope: ['profile'],
    });
  }

  async validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile,
    // eslint-disable-next-line @typescript-eslint/ban-types
    done: Function,
  ) {
    try {
      const jwt = 'placeholderJWT';
      const user = {
        jwt,
      };

      done(null, user);
    } catch (err) {
      done(err, false);
    }
  }
}
