import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
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
import { News } from './news/entities/news.entity';
import { NewsModule } from './news/news.module';
import { TagModule } from './tag/tag.module';
import { Page } from './page/entities/page.entity';
import { PageModule } from './page/page.module';
import { Events } from './events/entities/events.entity';
import { EventsModule } from './events/events.module';
import { ToolsModule } from './tools/tools.module';
import { Tools } from './tools/entities/tools.entity';
import { PaywallModule } from './paywall/paywall.module';
import { EmailModule } from './email/email.module';
import { FileModule } from './file/file.module';

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
      entities: [User, KnowledgeBase, Tag, News, Page, Events, Tools],
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
    NewsModule,
    TagModule,
    PageModule,
    EventsModule,
    ToolsModule,
    PaywallModule,
    EmailModule,
    FileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
