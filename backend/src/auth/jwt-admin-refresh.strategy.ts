import {Injectable} from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request as RequestType } from 'express';
import { Strategy } from "passport-jwt";
import * as CryptoJS from 'crypto-js';
import * as dotenv from "dotenv";
dotenv.config();

@Injectable()
export class JwtAdminRefreshStrategyRefresh extends PassportStrategy(Strategy, "jwt-admin-refresh") {
  constructor() {
    super({
      jwtFromRequest: JwtAdminRefreshStrategyRefresh.extractJWT,
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ADMIN_SECRET,
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }

  private static extractJWT(req: RequestType): string | null {
    if (req.cookies && 'toheyo_admin_session' in req.cookies) {
      return CryptoJS.AES.decrypt(req.cookies.toheyo_admin_session, process.env.JWT_ADMIN_SECRET!).toString(CryptoJS.enc.Utf8);
    }
    return null;
  }
}
