import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { User } from './interfaces/user.interface';
import { JwtAdminGuard, JwtAuthGuard } from '../auth/jwt-auth.guard';
import { NewPasswordDto } from './dto/newPassword.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @HttpCode(201)
  async createUser(@Body() body: CreateUserDto) {
    await this.userService.create(body);
  }

  @Get('check/:username')
  @HttpCode(200)
  async checkIfUserExists(
    @Param('username') username: string,
  ): Promise<boolean> {
    return await this.userService.checkIfUserExists(username);
  }

  @UseGuards(JwtAdminGuard)
  @Get('all')
  @HttpCode(200)
  async getAllUsers(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @HttpCode(200)
  async getUser(@Param('username') id: number): Promise<User> {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':username')
  @HttpCode(200)
  async changePassword(
    @Param('username') username: string,
    @Body('newPassword') body: string,
  ) {
    const user = await this.userService.changePassword(username, body);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @UseGuards(JwtAdminGuard)
  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param('id') id: number) {
    await this.userService.delete(id);
  }

  @Post('reset-password')
  @HttpCode(200)
  async resetPassword(@Body('username') body: string) {
    await this.userService.resetPassword(body);
  }
}
