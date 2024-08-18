import { IsArray, IsNotEmpty, IsString } from 'class-validator';
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
  accessibilityTag: number[];

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
  socialPositioningTag: number[];

  @IsArray()
  featureTag: number[];

  @IsArray()
  similarTools: Tools[];
}
