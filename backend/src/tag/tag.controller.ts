import { BadRequestException, Body, Controller, Delete, Get, HttpCode, Param, Post, UseGuards } from '@nestjs/common';
import {JwtAdminGuard} from "../auth/jwt-auth.guard";
import {TagService} from "./tag.service";
import { Tag } from './entities/tag.entity';
import { TagDto } from './dto/tag.dto';

@Controller('tag')
export class TagController {
    constructor(private tagService: TagService) {
    }

    @UseGuards(JwtAdminGuard)
    @Post()
    @HttpCode(201)
    async createTag(@Body() body: TagDto) {
        try {
            await this.tagService.create(body);
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    @Get('all')
    @HttpCode(200)
    async getAllTags(): Promise<Tag[]> {
        return await this.tagService.findAll()
    }

    @UseGuards(JwtAdminGuard)
    @Delete(":id")
    @HttpCode(204)
    async deleteTag(@Param("id") id: number) {
        await this.tagService.delete(id)
    }
}
