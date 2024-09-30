import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { FileService } from './file.service';
import { JwtAdminGuard } from '../auth/jwt-auth.guard';

@Controller('file')
export class FilesController {
  constructor(private readonly fileService: FileService) {}

  @UseGuards(JwtAdminGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const bucket = 'pf-ctr';
    const url = await this.fileService.uploadFile(file, bucket);
    return {
      message: 'File uploaded successfully!',
      url,
    };
  }

  @Get(':key')
  async downloadFile(@Param('key') key: string, @Res() res: Response) {
    const bucket = 'pf-ctr';
    const { stream, contentType } = await this.fileService.downloadFile(
      key,
      bucket,
    );

    res.set({
      'Content-Type': contentType,
      'Content-Disposition': `inline; filename="${key}"`,
    });

    stream.pipe(res);
  }

  @UseGuards(JwtAdminGuard)
  @Delete(':key')
  async deleteFile(@Param('key') key: string) {
    const bucket = 'pf-ctr';
    await this.fileService.deleteFile(key, bucket);
    return {
      message: 'File deleted successfully!',
    };
  }
}
