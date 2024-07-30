import { Module } from '@nestjs/common';
import { PaywallController } from './paywall.controller';
import { PaywallService } from './paywall.service';
import { UserModule } from '../user/user.module';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [UserModule, EmailModule],
  controllers: [PaywallController],
  providers: [PaywallService],
  exports: [PaywallService],
})
export class PaywallModule {}
