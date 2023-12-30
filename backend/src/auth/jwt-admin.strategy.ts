import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {Injectable} from '@nestjs/common';
import * as dotenv from "dotenv";
dotenv.config();

@Injectable()
export class JwtAdminStrategy extends PassportStrategy(Strategy, "jwt-admin") {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ADMIN_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
