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
import { EventsService } from './events.service';
import { EventsDto } from './dto/events.dto';
import { Events } from './entities/events.entity';

@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @UseGuards(JwtAdminGuard)
  @Post()
  @HttpCode(201)
  async createEvent(@Body() body: EventsDto) {
    try {
      await this.eventsService.create(body);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Get('all')
  @HttpCode(200)
  async getAllEvents(): Promise<Events[]> {
    return await this.eventsService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  async getNewsById(@Param('id') id: number) {
    const event = await this.eventsService.findOne(id);
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    return event;
  }

  @UseGuards(JwtAdminGuard)
  @Patch('')
  @HttpCode(204)
  async updateEvents(@Body() body: EventsDto) {
    try {
      await this.eventsService.update(body);
    } catch (e) {
      console.log('error', e.message);
      throw new BadRequestException(e.message);
    }
  }

  @UseGuards(JwtAdminGuard)
  @Delete(':id')
  @HttpCode(204)
  async deleteNews(@Param('id') id: number) {
    await this.eventsService.delete(id);
  }
}
