import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common';
import { EmailService } from './email.service';
import { ContactDto } from './dto/contact.dto';

@Controller('email')
export class EmailController {
  constructor(private emailService: EmailService) {}

  @Post('contact')
  @HttpCode(201)
  async sendContactForm(@Body() body: ContactDto) {
    try {
      return await this.emailService.contactEmail(body);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
