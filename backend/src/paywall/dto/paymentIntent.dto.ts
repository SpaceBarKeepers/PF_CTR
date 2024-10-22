import { IsObject, IsString } from 'class-validator';

export class PaymentIntentDto {
  @IsString()
  option: CTR_OPTION_ENUM;

  @IsString()
  shipping: CTR_SHIPPING_ENUM;

  @IsObject()
  metadata: Record<string, string>;
}

export enum CTR_OPTION_ENUM {
  DIGITAL = 'digital',
  PRINTED = 'printed',
  BUNDLE = 'bundle',
}

export enum CTR_SHIPPING_ENUM {
  CZECHIA = 'czechia',
  EU = 'eu',
  NORTH_AMERICA = 'north_america',
  OTHER = 'other',
  NONE = 'none',
}
