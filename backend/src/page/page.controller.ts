import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { JwtAdminGuard } from '../auth/jwt-auth.guard';
import { PageService } from './page.service';
import { PageDto } from './dto/page.dto';

@Controller('page')
export class PageController {
  constructor(private pageService: PageService) {}

  @Get(':id')
  @HttpCode(200)
  async getPageById(@Param('id') id: string) {
    const page = await this.pageService.findOne(id);
    if (!page) {
      throw new NotFoundException('Page article not found');
    }
    return page;
  }

  @UseGuards(JwtAdminGuard)
  @Patch('')
  @HttpCode(204)
  async updatePage(@Body() body: PageDto) {
    try {
      await this.pageService.update(body);
    } catch (e) {
      console.log('error', e.message);
      throw new BadRequestException(e.message);
    }
  }
}
