import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request as RequestType } from 'express';
import { Strategy } from "passport-jwt";
import * as CryptoJS from 'crypto-js';
import * as dotenv from "dotenv";
import {AuthService} from "./auth.service";
dotenv.config();

@Injectable()
export class JwtStrategyRefresh extends PassportStrategy(Strategy, "jwt-refresh") {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: JwtStrategyRefresh.extractJWT,
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    // Check for device hash header
    // @ts-ignore
    const deviceHash = req.headers["device-hash"]
    if (!deviceHash) throw new HttpException("Bad request: 'device-hash' header missing", HttpStatus.BAD_REQUEST)

    // Check that device hash matches the one in the payload
    const result = await this.authService.checkDeviceHash(payload.username, deviceHash)
    if (result === null) throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED)
    if (!result) throw new HttpException("Device hash does not match activeDevice.", HttpStatus.I_AM_A_TEAPOT)

    return { userId: payload.sub, username: payload.username };
  }

  private static extractJWT(req: RequestType): string | null {
    if (req.cookies && 'toheyo_session' in req.cookies) {
      return CryptoJS.AES.decrypt(req.cookies.toheyo_session, process.env.JWT_SECRET!).toString(CryptoJS.enc.Utf8);
    }
    return null;
  }
}
