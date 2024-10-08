import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tools } from './entities/tools.entity';
import { ToolsDto } from './dto/tools.dto';

@Injectable()
export class ToolsService {
  constructor(
    @InjectRepository(Tools)
    private readonly toolsRepository: Repository<Tools>,
  ) {}

  async create(tool: ToolsDto) {
    const createdTool = new Tools();
    createdTool.toolsName = tool.toolsName;
    createdTool.descEn = tool.descEn;
    createdTool.descCS = tool.descCs;
    createdTool.featuresEn = tool.featuresEn;
    createdTool.featuresCs = tool.featuresCs;
    createdTool.dataProtectionEn = tool.dataProtectionEn;
    createdTool.dataProtectionCs = tool.dataProtectionCs;
    createdTool.authenticationEn = tool.authenticationEn;
    createdTool.authenticationCs = tool.authenticationCs;
    createdTool.nextProductUpdateEn = tool.nextProductUpdateEn;
    createdTool.nextProductUpdateCs = tool.nextProductUpdateCs;
    createdTool.feedEn = tool.feedEn;
    createdTool.feedCs = tool.feedCs;
    createdTool.accessibilityTag = tool.accessibilityTag;
    createdTool.established = tool.established;
    createdTool.noOfClients = tool.noOfClients;
    createdTool.team = tool.team;
    createdTool.email = tool.email;
    createdTool.phone = tool.phone;
    createdTool.web = tool.web;
    createdTool.countries = tool.countries;
    createdTool.partners = tool.partners;
    createdTool.socialPositioningTag = tool.socialPositioningTag;
    createdTool.featureTag = tool.featureTag;
    createdTool.caseStudyOnePublishedEn = tool.caseStudyOnePublishedEn;
    createdTool.caseStudyOneTitleEn = tool.caseStudyOneTitleEn;
    createdTool.caseStudyOneImgEn = tool.caseStudyOneImgEn;
    createdTool.caseStudyOneDescEn = tool.caseStudyOneDescEn;
    createdTool.caseStudyOneHighlightOneEn = tool.caseStudyOneHighlightOneEn;
    createdTool.caseStudyOneHighlightTwoEn = tool.caseStudyOneHighlightTwoEn;
    createdTool.caseStudyOneHighlightThreeEn = tool.caseStudyOneHighlightThreeEn;
    createdTool.caseStudyOneHighlightFourEn = tool.caseStudyOneHighlightFourEn;
    createdTool.caseStudyOnePublishedCs = tool.caseStudyOnePublishedCs;
    createdTool.caseStudyOneTitleCs = tool.caseStudyOneTitleCs;
    createdTool.caseStudyOneImgCs = tool.caseStudyOneImgCs;
    createdTool.caseStudyOneDescCs = tool.caseStudyOneDescCs;
    createdTool.caseStudyOneHighlightOneCs = tool.caseStudyOneHighlightOneCs;
    createdTool.caseStudyOneHighlightTwoCs = tool.caseStudyOneHighlightTwoCs;
    createdTool.caseStudyOneHighlightThreeCs = tool.caseStudyOneHighlightThreeCs;
    createdTool.caseStudyOneHighlightFourCs = tool.caseStudyOneHighlightFourCs;
    createdTool.caseStudyTwoPublishedEn = tool.caseStudyTwoPublishedEn;
    createdTool.caseStudyTwoTitleEn = tool.caseStudyTwoTitleEn;
    createdTool.caseStudyTwoImgEn = tool.caseStudyTwoImgEn;
    createdTool.caseStudyTwoDescEn = tool.caseStudyTwoDescEn;
    createdTool.caseStudyTwoHighlightOneEn = tool.caseStudyTwoHighlightOneEn;
    createdTool.caseStudyTwoHighlightTwoEn = tool.caseStudyTwoHighlightTwoEn;
    createdTool.caseStudyTwoHighlightThreeEn = tool.caseStudyTwoHighlightThreeEn;
    createdTool.caseStudyTwoHighlightFourEn = tool.caseStudyTwoHighlightFourEn;
    createdTool.caseStudyTwoPublishedCs = tool.caseStudyTwoPublishedCs;
    createdTool.caseStudyTwoTitleCs = tool.caseStudyTwoTitleCs;
    createdTool.caseStudyTwoImgCs = tool.caseStudyTwoImgCs;
    createdTool.caseStudyTwoDescCs = tool.caseStudyTwoDescCs;
    createdTool.caseStudyTwoHighlightOneCs = tool.caseStudyTwoHighlightOneCs;
    createdTool.caseStudyTwoHighlightTwoCs = tool.caseStudyTwoHighlightTwoCs;
    createdTool.caseStudyTwoHighlightThreeCs = tool.caseStudyTwoHighlightThreeCs;
    createdTool.caseStudyTwoHighlightFourCs = tool.caseStudyTwoHighlightFourCs;
    // createdTool.similarTools = tool.similarTools;

    return this.toolsRepository.save(createdTool);
  }

  async findAll(): Promise<Tools[]> {
    return await this.toolsRepository.find();
  }

  async findOne(id: number): Promise<Tools | null> {
    return this.toolsRepository.findOneBy({ id });
  }

  async update(tool: Tools) {
    return this.toolsRepository.save(tool);
  }

  delete(id: number) {
    return this.toolsRepository.delete({ id });
  }
}
