import { IsArray, IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { Tools } from '../entities/tools.entity';

export class ToolsDto {
  @IsString()
  @IsNotEmpty()
  toolsName: string;

  @IsString()
  logo: string;

  @IsString()
  @IsNotEmpty()
  descEn: string;

  @IsString()
  descCs: string;

  @IsArray()
  featuresEn: string[];

  @IsArray()
  featuresCs: string[];

  @IsString()
  dataProtectionEn: string;

  @IsString()
  dataProtectionCs: string;

  @IsString()
  authenticationEn: string;

  @IsString()
  authenticationCs: string;

  @IsString()
  nextProductUpdateEn: string;

  @IsString()
  nextProductUpdateCs: string;

  @IsArray()
  feedEn: string[];

  @IsArray()
  feedCs: string[];

  @IsArray()
  accessibilityTag: string[];

  @IsString()
  established: string;

  @IsString()
  noOfClients: string;

  @IsString()
  team: string;

  @IsString()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  web: string;

  @IsArray()
  countries: string[];

  @IsString()
  partners: string;

  @IsArray()
  socialPositioningTag: string[];

  @IsArray()
  featureTag: string[];

  @IsArray()
  similarTools: Tools[];

  @IsBoolean()
  caseStudyOnePublishedEn: boolean;

  @IsString()
  caseStudyOneTitleEn: string;

  @IsString()
  caseStudyOneImgEn: string;

  @IsString()
  caseStudyOneDescEn: string;

  @IsString()
  caseStudyOneHighlightOneEn: string;

  @IsString()
  caseStudyOneHighlightTwoEn: string;

  @IsString()
  caseStudyOneHighlightThreeEn: string;

  @IsString()
  caseStudyOneHighlightFourEn: string;

  @IsBoolean()
  caseStudyOnePublishedCs: boolean;

  @IsString()
  caseStudyOneTitleCs: string;

  @IsString()
  caseStudyOneImgCs: string;

  @IsString()
  caseStudyOneDescCs: string;

  @IsString()
  caseStudyOneHighlightOneCs: string;

  @IsString()
  caseStudyOneHighlightTwoCs: string;

  @IsString()
  caseStudyOneHighlightThreeCs: string;

  @IsString()
  caseStudyOneHighlightFourCs: string;

  @IsBoolean()
  caseStudyTwoPublishedEn: boolean;

  @IsString()
  caseStudyTwoTitleEn: string;

  @IsString()
  caseStudyTwoImgEn: string;

  @IsString()
  caseStudyTwoDescEn: string;

  @IsString()
  caseStudyTwoHighlightOneEn: string;

  @IsString()
  caseStudyTwoHighlightTwoEn: string;

  @IsString()
  caseStudyTwoHighlightThreeEn: string;

  @IsString()
  caseStudyTwoHighlightFourEn: string;

  @IsBoolean()
  caseStudyTwoPublishedCs: boolean;

  @IsString()
  caseStudyTwoTitleCs: string;

  @IsString()
  caseStudyTwoImgCs: string;

  @IsString()
  caseStudyTwoDescCs: string;

  @IsString()
  caseStudyTwoHighlightOneCs: string;

  @IsString()
  caseStudyTwoHighlightTwoCs: string;

  @IsString()
  caseStudyTwoHighlightThreeCs: string;

  @IsString()
  caseStudyTwoHighlightFourCs: string;
}
