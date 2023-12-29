import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import * as dotenv from "dotenv";
import {AuthService} from "./auth.service";
dotenv.config();

@Injectable()
export class JwtWithoutDeviceStrategy extends PassportStrategy(Strategy, "jwt-without-device") {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
