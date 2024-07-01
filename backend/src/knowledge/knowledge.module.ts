import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Knowledge, KnowledgeSchema } from './schemas/knowledge.schema';
import { KnowledgeController } from './knowledge.controller';
import { KnowledgeService } from './knowledge.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { KnowledgeBase } from './entities/knowledge.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([KnowledgeBase])],
  controllers: [KnowledgeController],
  providers: [KnowledgeService],
  exports: [KnowledgeService],
})
export class KnowledgeModule {}
