import {Controller, Delete, Get, HttpCode, Param, Post, UseGuards} from "@nestjs/common";
import {JwtAdminGuard} from "../auth/jwt-auth.guard";
import {TagService} from "./tag.service";
import {Tag} from "./interfaces/tag.interface";

@Controller('tag')
export class TagController {
    constructor(private tagService: TagService) {
    }

    @UseGuards(JwtAdminGuard)
    @Post(":tag")
    @HttpCode(201)
    async createTag(@Param("tag") tag: string) {
        await this.tagService.create({tag})
    }

    @UseGuards(JwtAdminGuard)
    @Get('all')
    @HttpCode(200)
    async getAllTags(): Promise<Tag[]> {
        return await this.tagService.findAll()
    }

    @UseGuards(JwtAdminGuard)
    @Delete(":tag")
    @HttpCode(204)
    async deleteTag(@Param("tag") tag: string) {
        await this.tagService.delete(tag)
    }
}
