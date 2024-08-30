import {
  BadRequestException,
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
import { JwtAdminGuard, JwtAuthGuard, JwtCombinedGuard } from '../auth/jwt-auth.guard';
import { ToolsService } from './tools.service';
import { ToolsDto } from './dto/tools.dto';
import { Tools } from './entities/tools.entity';

@Controller('tools')
export class ToolsController {
  constructor(private toolsService: ToolsService) {}

  @UseGuards(JwtAdminGuard)
  @Post()
  @HttpCode(201)
  async createTools(@Body() body: ToolsDto) {
    try {
      await this.toolsService.create(body);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @UseGuards(JwtCombinedGuard)
  @Get('all')
  @HttpCode(200)
  async getAllTools(): Promise<Tools[]> {
    return await this.toolsService.findAll();
  }

  @UseGuards(JwtCombinedGuard)
  @Get(':id')
  @HttpCode(200)
  async getToolById(@Param('id') id: number) {
    const tool = await this.toolsService.findOne(id);
    if (!tool) {
      throw new NotFoundException('NewsEntity article not found');
    }
    return tool;
  }

  @UseGuards(JwtAdminGuard)
  @Patch('')
  @HttpCode(204)
  async updateTool(@Body() body: Tools) {
    try {
      await this.toolsService.update(body);
    } catch (e) {
      console.log('error', e.message);
      throw new BadRequestException(e.message);
    }
  }

  @UseGuards(JwtAdminGuard)
  @Delete(':id')
  @HttpCode(204)
  async deleteTool(@Param('id') id: number) {
    await this.toolsService.delete(id);
  }
}
