import { Injectable } from '@nestjs/common';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { PassThrough, Readable } from 'stream';

@Injectable()
export class FileService {
  private readonly s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      // region: process.env.S3_SPACES_REGION!,
      region: 'pokius',
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      // endpoint: process.env.S3_SPACES_ENDPOINT!,
      endpoint: 'pokius',
      credentials: {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        // accessKeyId: process.env.S3_SPACES_ACCESS_KEY_ID!,
        accessKeyId: 'pokius',
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        // secretAccessKey: process.env.S3_SPACES_SECRET_ACCESS_KEY!,
        secretAccessKey: 'pokius',
      },
      forcePathStyle: true, // Required for DigitalOcean Spaces
    });
  }

  async uploadFile(file: Express.Multer.File, bucket: string): Promise<string> {
    const uniqueFileName = `${Date.now()}-${file.originalname}`;
    const upload = new Upload({
      client: this.s3Client,
      params: {
        Bucket: bucket,
        Key: uniqueFileName,
        Body: file.buffer,
        ContentType: file.mimetype,
      },
    });

    const result = await upload.done();
    console.log('Uploaded file:', result);
    // return `https://${bucket}.${process.env
    //   .S3_SPACES_REGION!}.digitaloceanspaces.com/${file.originalname}`;
    // return `http://localhost:3000/file/${uniqueFileName}`;
    return `https://civictechreport.com/file/${uniqueFileName}`;
  }

  async downloadFile(
    key: string,
    bucket: string,
  ): Promise<{ stream: PassThrough; contentType: string }> {
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: key,
    });

    const response = await this.s3Client.send(command);

    const stream = new PassThrough();
    if (response.Body instanceof ReadableStream) {
      const reader = response.Body.getReader();
      reader.read().then(function process({ done, value }) {
        if (done) {
          stream.end();
          return;
        }
        stream.write(value);
        reader.read().then(process);
      });
    } else {
      (response.Body as Readable).pipe(stream); // Node.js environment stream handling
    }

    return {
      stream,
      contentType: response.ContentType || 'application/octet-stream',
    };
  }
}
