import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import {
  CTR_OPTION_ENUM,
  CTR_SHIPPING_ENUM,
  PaymentIntentDto,
} from './dto/paymentIntent.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { generateBcryptHash } from '../utils/generateBcryptHash';
import { generatePassword } from '../utils/generatePassword';
import { EmailService } from '../email/email.service';

@Injectable()
export class PaywallService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly emailService: EmailService,
  ) {}

  async createPaymentIntent(
    body: PaymentIntentDto,
  ): Promise<Record<string, string>> {
    const stripe = new Stripe(process.env.STRIPE_API_KEY!);

    const calculateOrderAmount = (
      option: CTR_OPTION_ENUM,
      shipping: CTR_SHIPPING_ENUM,
    ) => {
      let optionPrice = 0;
      let shippingPrice = 0;
      switch (option) {
        case CTR_OPTION_ENUM.INDIVIDUAL:
          optionPrice = 490;
          break;
        case CTR_OPTION_ENUM.PARTICIPATION:
          optionPrice = 790;
          break;
      }

      switch (shipping) {
        case CTR_SHIPPING_ENUM.CZECHIA:
          shippingPrice = 3.5;
          break;
        case CTR_SHIPPING_ENUM.EU:
          shippingPrice = 26;
          break;
        case CTR_SHIPPING_ENUM.NORTH_AMERICA:
          shippingPrice = 31;
          break;
        case CTR_SHIPPING_ENUM.OTHER:
          shippingPrice = 40;
          break;
      }

      return optionPrice + shippingPrice;
    };

    const paymentIntent: Stripe.Response<Stripe.PaymentIntent> =
      await stripe.paymentIntents.create({
        amount: calculateOrderAmount(body.option, body.shipping),
        currency: 'eur',
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        automatic_payment_methods: {
          enabled: true,
        },
        metadata: body.metadata,
      });

    if (paymentIntent.client_secret)
      return { clientSecret: paymentIntent.client_secret };
    else throw new Error('Client secret not found');
  }

  async stripeWebhook(body: any, sig: string): Promise<void> {
    const stripe = new Stripe(process.env.STRIPE_API_KEY!);
    console.log('Stripe webhook received:1');

    // const sig = body.headers['stripe-signature'];
    console.log('Stripe webhook received:11');
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;
    console.log('Stripe webhook received:12');
    let event: Stripe.Event;
    console.log('Stripe webhook received:2');

    try {
      console.log('Stripe webhook received:31');
      event = stripe.webhooks.constructEvent(body.rawBody, sig, endpointSecret);
      console.log('Stripe webhook received:32');
    } catch (err) {
      console.log('Stripe webhook received:33', err.message);
      throw new Error(`Webhook Error: ${err.message}`);
      console.log('Stripe webhook received:34');
    }
    console.log('Stripe webhook received:4', event.type);

    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;

        try {
          const password = generatePassword(16);
          const hashedPassword = await generateBcryptHash(password);
          console.log('hashed', hashedPassword);
          const user: User = new User();
          user.username = paymentIntent.metadata.email;
          user.password = hashedPassword!;
          user.name = paymentIntent.metadata.name;
          user.organization = paymentIntent.metadata.organization;
          user.phone = paymentIntent.metadata.phone;
          user.address = paymentIntent.metadata.address;
          user.shippingCode = paymentIntent.metadata.shippingCode;
          user.registrationType = 'paygate';

          await this.emailService.sendPasswordEmail(
            paymentIntent.metadata.email,
            password,
          );

          await this.emailService.sendCopyEmailToPF(
            paymentIntent.metadata.email,
            paymentIntent.metadata.name,
            paymentIntent.metadata.address,
            paymentIntent.metadata.shippingCode,
            paymentIntent.metadata.organization,
            paymentIntent.metadata.phone,
          );

          await this.userRepository.save(user);
        } catch (error) {
          throw new Error('Error while creating user from paygate');
        }

        console.log('PaymentIntent was successful!', paymentIntent);
        break;
      case 'payment_intent.payment_failed':
        const paymentIntentFailed = event.data.object as Stripe.PaymentIntent;
        console.log('PaymentIntent failed!');
        break;
    }
  }
}
