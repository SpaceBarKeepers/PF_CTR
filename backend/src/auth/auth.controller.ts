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
import {LocalAdminAuthGuard, LocalAuthGuard} from "./local-auth.guard";
import {
    JwtAdminGuard,
    JwtAdminRefreshGuard,
    JwtAuthGuard,
    JwtRefreshGuard,
    JwtWithoutDeviceAuthGuard
} from "./jwt-auth.guard";
import * as CryptoJS from 'crypto-js';
import * as dotenv from "dotenv";

dotenv.config();

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    @HttpCode(200)
    async login(@Request() req: any, @Res({passthrough: true}) response: Response) {
        const refreshToken = await this.authService.generateRefreshToken(req.user)
        response.cookie("toheyo_session", CryptoJS.AES.encrypt(refreshToken, process.env.JWT_SECRET!).toString(), {httpOnly: true})
        return this.authService.login(req.user);
    }

    @Post('auth/logout')
    @HttpCode(200)
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
    @HttpCode(200)
    getProfile(@Request() req: any) {
        return req.user;
    }

    @UseGuards(JwtRefreshGuard)
    @Post('auth/refresh')
    @HttpCode(200)
    async refresh(@Request() req: any, @Res({passthrough: true}) res: Response) {
        const refreshToken = await this.authService.generateRefreshToken(req.user)
        res.cookie("toheyo_session", CryptoJS.AES.encrypt(refreshToken, process.env.JWT_SECRET!).toString(), {httpOnly: true})
        return this.authService.login(req.user);
    }

    @UseGuards(LocalAdminAuthGuard)
    @Post('auth/admin/login')
    @HttpCode(200)
    async loginAdmin(@Request() req: any, @Res({passthrough: true}) response: Response) {
        const refreshToken = await this.authService.generateAdminRefreshToken(req.user)
        response.cookie("toheyo_admin_session", CryptoJS.AES.encrypt(refreshToken, process.env.JWT_ADMIN_SECRET!).toString(), {httpOnly: true})
        return this.authService.loginAdmin(req.user);
    }

    @UseGuards(JwtAdminRefreshGuard)
    @Post('auth/admin/refresh')
    @HttpCode(200)
    async refreshAdmin(@Request() req: any, @Res({passthrough: true}) res: Response) {
        const refreshToken = await this.authService.generateAdminRefreshToken(req.user)
        res.cookie("toheyo_admin_session", CryptoJS.AES.encrypt(refreshToken, process.env.JWT_ADMIN_SECRET!).toString(), {httpOnly: true})
        return this.authService.loginAdmin(req.user);
    }

    @Post('auth/admin/logout')
    @HttpCode(200)
    async logoutAdmin(@Res({passthrough: true}) response: Response) {
        response.clearCookie("toheyo_admin_session")
        return true
    }
}
