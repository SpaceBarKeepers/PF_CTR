import {
  Controller,
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
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const bucket = 'pf-ctr';
    const url = await this.fileService.uploadFile(file, bucket);
    return {
      message: 'File uploaded successfully!',
      url,
    };
  }

  @Get(':key')
  async downloadFile(@Param('key') key: string, @Res() res: Response) {
    const bucket = 'pf-ctr'; // Replace with your Space bucket name
    const { stream, contentType } = await this.fileService.downloadFile(
      key,
      bucket,
    );

    // Set appropriate headers for the image content
    res.set({
      'Content-Type': contentType,
      'Content-Disposition': `inline; filename="${key}"`, // Renders the image directly in the browser
    });

    // Pipe the image stream to the response
    stream.pipe(res);
  }
}
