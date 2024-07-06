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
import { NewsService } from './news.service';
import { News } from './entities/news.entity';
import { NewsDto } from './dto/news.dto';
import { JwtAdminGuard } from '../auth/jwt-auth.guard';

@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @UseGuards(JwtAdminGuard)
  @Post()
  @HttpCode(201)
  async createNews(@Body() body: NewsDto) {
    try {
      await this.newsService.create(body);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Get('all')
  @HttpCode(200)
  async getAllNews(): Promise<News[]> {
    return await this.newsService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  async getNewsById(@Param('id') id: number) {
    const knowledge = await this.newsService.findOne(id);
    if (!knowledge) {
      throw new NotFoundException('NewsEntity article not found');
    }
    return knowledge;
  }

  @UseGuards(JwtAdminGuard)
  @Patch(':id')
  @HttpCode(204)
  async updateNews(@Param('id') id: number, @Body() body: NewsDto) {
    try {
      await this.newsService.update(id, body);
    } catch (e) {
      console.log('error', e.message);
      throw new BadRequestException(e.message);
    }
  }

  @UseGuards(JwtAdminGuard)
  @Delete(':id')
  @HttpCode(204)
  async deleteNews(@Param('id') id: number) {
    await this.newsService.delete(id);
  }
}
