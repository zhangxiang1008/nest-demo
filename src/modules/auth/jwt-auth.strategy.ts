import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtSecertKey } from 'src/constants/jwt';

export interface JwtPayload {
  username: string;
}

@Injectable()
// 验证请求头中的token
export default class JwtAuthStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JwtSecertKey,
    });
  }

  async validate(payload: JwtPayload) {
    const { username } = payload;
    return {
      username,
    };
  }
}