import {
    Controller,
    Get,
    Post,
    Request,
    Res,
    UseGuards,
    Headers,
    HttpCode
} from "@nestjs/common";
import {Response} from "express";
import {AuthService} from "./auth.service";
import {LocalAuthGuard} from "./local-auth.guard";
import {JwtAuthGuard, JwtRefreshGuard, JwtWithoutDeviceAuthGuard} from "./jwt-auth.guard";
import * as CryptoJS from 'crypto-js';
import * as dotenv from "dotenv";

dotenv.config();

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req: any, @Res({passthrough: true}) response: Response) {
        const refreshToken = await this.authService.generateRefreshToken(req.user)
        response.cookie("toheyo_session", CryptoJS.AES.encrypt(refreshToken, process.env.JWT_SECRET!).toString(), {httpOnly: true})
        return this.authService.login(req.user);
    }

    @Post('auth/logout')
    async logout(@Res({passthrough: true}) response: Response) {
        response.clearCookie("toheyo_session")
        return true
    }

    @UseGuards(JwtAuthGuard)
    @Post('auth/checkDevice')
    @HttpCode(200)
    async checkDevice() {
        return
    }

    @UseGuards(JwtWithoutDeviceAuthGuard)
    @Post('auth/reassignDevice')
    @HttpCode(200)
    async reassignDevice(@Request() req: any, @Headers("device-hash") deviceHash: string) {
        await this.authService.reassignDeviceHash(req.user.username, deviceHash)
        return
    }

    @UseGuards(JwtAuthGuard)
    @Get('pokus')
    getProfile(@Request() req: any) {
        return req.user;
    }

    @UseGuards(JwtRefreshGuard)
    @Post('auth/refresh')
    async refresh(@Request() req: any, @Res({passthrough: true}) res: Response) {
        const refreshToken = await this.authService.generateRefreshToken(req.user)
        res.cookie("refreshToken", CryptoJS.AES.encrypt(refreshToken, process.env.JWT_SECRET!).toString(), {httpOnly: true})
        return this.authService.login(req.user);
    }
}
