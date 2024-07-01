import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import * as dotenv from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import * as process from 'node:process';
import { KnowledgeBase } from './knowledge/entities/knowledge.entity';
import { Tag } from './tag/entities/tag.entity';
import { KnowledgeModule } from './knowledge/knowledge.module';

dotenv.config();

@Module({
  imports: [
    // MongooseModule.forRoot(process.env.DATABASE_URL!, {
    //   tlsInsecure: true,
    //   ssl: true,
    //   readPreference: 'primary',
    //   replicaSet: process.env.DATABASE_REPLICA_SET,
    //   authSource: process.env.DATABASE_AUTH_SOURCE,
    //   user: process.env.DATABASE_USER,
    //   pass: process.env.DATABASE_PASSWORD,
    //   dbName: process.env.DATABASE_DBNAME,
    // }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 25060,
      password: process.env.DB_PASSWORD,
      username: process.env.DB_USERNAME,
      entities: [User, KnowledgeBase, Tag],
      database: process.env.DB_NAME,
      synchronize: true,
      logging: true,
      ssl: {
        rejectUnauthorized: false,
        ca: process.env.DB_SSL_CERT,
      },
    }),
    ServeStaticModule.forRoot({
      // rootPath: join(__dirname, '..', '..', 'client', 'dist'),
      rootPath: join(__dirname, '..', 'client'),
    }),
    UserModule,
    AuthModule,
    KnowledgeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
