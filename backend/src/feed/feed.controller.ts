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
import { JwtAdminGuard } from '../auth/jwt-auth.guard';
import { FeedService } from './feed.service';
import { FeedDto } from './dto/feed.dto';
import {  Feed } from './entities/feed.entity';

@Controller('feed')
export class FeedController {
  constructor(private feedService: FeedService) {}

  @UseGuards(JwtAdminGuard)
  @Post()
  @HttpCode(201)
  async createEvent(@Body() body: FeedDto) {
    try {
      await this.feedService.create(body);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Get('all')
  @HttpCode(200)
  async getAllEvents(): Promise<Feed[]> {
    return await this.feedService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  async getNewsById(@Param('id') id: number) {
    const event = await this.feedService.findOne(id);
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    return event;
  }

  @UseGuards(JwtAdminGuard)
  @Patch('')
  @HttpCode(204)
  async updateEvents(@Body() body: FeedDto) {
    try {
      await this.feedService.update(body);
    } catch (e) {
      console.log('error', e.message);
      throw new BadRequestException(e.message);
    }
  }

  @UseGuards(JwtAdminGuard)
  @Delete(':id')
  @HttpCode(204)
  async deleteNews(@Param('id') id: number) {
    await this.feedService.delete(id);
  }
}
