import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(id: number, pass: string): Promise<any> {
    const user = await this.userService.findOne(id);
    if (!user) return null;
    const passwordOk = await bcrypt.compare(pass, user.password);
    if (user && passwordOk) {
      const { password, ...result } = user;
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async loginAdmin(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      admin_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_ADMIN_SECRET,
      }),
    };
  }

  async generateRefreshToken(user: any) {
    const payload = { username: user.username };
    return this.jwtService.sign(payload, { expiresIn: '30d' });
  }

  async generateAdminRefreshToken(user: any) {
    const payload = { username: user.username };
    return this.jwtService.sign(payload, {
      expiresIn: '30d',
      secret: process.env.JWT_ADMIN_SECRET,
    });
  }

  async checkDeviceHash(id: number, deviceHash: string) {
    const user = await this.userService.findOne(id);
    if (!user) return null;

    if (user.activeDevice) {
      if (user.activeDevice === deviceHash) return true;
    } else {
      await this.userService.assignActiveDevice(id, deviceHash);
      return true;
    }
    return false;
  }

  async reassignDeviceHash(id: number, deviceHash: string) {
    return await this.userService.assignActiveDevice(id, deviceHash);
  }

  async validateAdminUser(username: string, pass: string): Promise<any> {
    const usernameOk = username === process.env.ADMIN_USERNAME;
    const passwordOk = await bcrypt.compare(pass, process.env.ADMIN_PASSWORD!);
    if (usernameOk && passwordOk) {
      return { username: process.env.ADMIN_USERNAME };
    }
    return null;
  }
}
