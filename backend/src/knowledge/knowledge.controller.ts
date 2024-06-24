import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    NotFoundException,
    Param, Patch,
    Post,
    UseGuards
} from "@nestjs/common";
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
        try {
            await this.knowledgeService.create(body)
        } catch (e) {
            throw new BadRequestException(e.message)
        }
    }

    @Get('all')
    @HttpCode(200)
    async getAllKnowledge(): Promise<KnowledgeInterface[]> {
        return await this.knowledgeService.findAll()
    }

    @Get(':id')
    @HttpCode(200)
    async getKnowledgeById(@Param("id") id: string) {
        const knowledge = await this.knowledgeService.findOne(id)
        if (!knowledge) {
            throw new NotFoundException("Knowledge base article not found")
        }
        return knowledge
    }

    @UseGuards(JwtAdminGuard)
    @Patch(':id')
    @HttpCode(204)
    async updateKnowledge(@Param("id") id: string, @Body() body: NewKnowledgeDto) {
        try {
            await this.knowledgeService.update(id, body)
        } catch (e) {
            throw new BadRequestException(e.message)
        }
    }

    @UseGuards(JwtAdminGuard)
    @Delete(":id")
    @HttpCode(204)
    async deleteKnowledge(@Param("id") id: string) {
        await this.knowledgeService.delete(id)
    }
}
