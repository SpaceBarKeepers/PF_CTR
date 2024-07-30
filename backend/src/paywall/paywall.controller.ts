import {
  BadRequestException,
  Body,
  Controller,
  Headers,
  HttpCode,
  Post,
  RawBodyRequest,
  Req,
} from '@nestjs/common';
import { PaywallService } from './paywall.service';
import { PaymentIntentDto } from './dto/paymentIntent.dto';
import { UserService } from '../user/user.service';

@Controller('paywall')
export class PaywallController {
  constructor(
    private paywallService: PaywallService,
  ) {}

  @Post('create-payment-intent')
  @HttpCode(201)
  async createPaymentIntent(@Body() body: PaymentIntentDto) {
    try {
      return await this.paywallService.createPaymentIntent(body);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('webhook')
  @HttpCode(200)
  async stripeWebhook(
    @Headers('stripe-signature') signature: string,
    @Req() req: RawBodyRequest<Request>,
  ) {
    try {
      await this.paywallService.stripeWebhook(req, signature);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
