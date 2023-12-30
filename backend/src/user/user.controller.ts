import {Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, UseGuards} from "@nestjs/common";
import {NewUserDto} from "./dto/user.dto";
import {UserService} from "./user.service";
import {User} from "./interfaces/user.interface";
import {JwtAdminGuard, JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {
    }

    @Post()
    @HttpCode(201)
    async createUser(@Body() body: NewUserDto) {
        await this.userService.create(body)
    }

    @UseGuards(JwtAdminGuard)
    @Get('all')
    @HttpCode(200)
    async getAllUsers(): Promise<User[]> {
        return await this.userService.findAll()
    }

    @UseGuards(JwtAuthGuard)
    @Get(":username")
    @HttpCode(200)
    async getUser(@Param("username") username: string): Promise<User> {
        const user = await this.userService.findOne(username)
        if (!user) {
            throw new NotFoundException("User not found")
        }
        return user
    }

    @UseGuards(JwtAdminGuard)
    @Delete(":username")
    @HttpCode(204)
    async deleteUser(@Param("username") username: string) {
        await this.userService.delete(username)
    }
}
