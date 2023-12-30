import {Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Post, UseGuards} from "@nestjs/common";
import {JwtAdminGuard} from "../auth/jwt-auth.guard";
import {KnowledgeService} from "./knowledge.service";
import {NewKnowledgeDto} from "./dto/knowledge.dto";
import {KnowledgeInterface} from "./interfaces/knowledge.interface";

@Controller('knowledge')
export class KnowledgeController {
    constructor(private knowledgeService: KnowledgeService) {
    }

    @UseGuards(JwtAdminGuard)
    @Post()
    @HttpCode(201)
    async createKnowledge(@Body() body: NewKnowledgeDto) {
        await this.knowledgeService.create(body)
    }

    @Get(':id')
    @HttpCode(200)
    async getAllTags(@Param("id") id: string): Promise<KnowledgeInterface> {
        const knowledge = await this.knowledgeService.findOne(id)
        if (!knowledge) {
            throw new NotFoundException("User not found")
        }
        return knowledge
    }

    @UseGuards(JwtAdminGuard)
    @Get('all')
    @HttpCode(200)
    async getAllKnowledge(): Promise<KnowledgeInterface[]> {
        return await this.knowledgeService.findAll()
    }

    @UseGuards(JwtAdminGuard)
    @Delete(":id")
    @HttpCode(204)
    async deleteKnowledge(@Param("id") id: string) {
        await this.knowledgeService.delete(id)
    }
}
