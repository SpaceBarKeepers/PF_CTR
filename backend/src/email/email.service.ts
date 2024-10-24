import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ContactDto } from './dto/contact.dto';
import { contactFormTemplate } from './emailTemplates/contactFormTemplate';
import { copyToPFRegistrationTemplate } from './emailTemplates/copyToPFRegistrationTemplate';
import { passwordResetTemplate } from './emailTemplates/passwordResetTemplate';
import { passwordRegistrationTemplate } from './emailTemplates/passwordRegistrationTemplate';
import { CTR_OPTION_ENUM } from '../paywall/dto/paymentIntent.dto';
import { passwordRegistrationPrintedTemplate } from './emailTemplates/passwordRegistrationPrintedTemplate';
import { passwordRegistrationBundleTemplate } from './emailTemplates/passwordRegistrationBundleTemplate';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.seznam.cz',
      port: 465,
      secure: true,
      auth: {
        user: 'civictechreport@civictechreport.com', // your SMTP username
        pass: process.env.SEZNAM_PWD, // your SMTP password
      },
    });
  }

  async sendRegistrationEmail(
    to: string,
    html: string,
    alternativeSubject?: string,
  ) {
    const mailOptions = {
      from: '"Civic Tech Report" <civictechreport@civictechreport.com>',
      to: to,
      replyTo: 'civictech@participationfactory.com',
      subject: alternativeSubject
        ? alternativeSubject
        : 'Civic Tech Report: Account created',
      html: html,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  async sendContactEmail(to: string, html: string) {
    const mailOptions = {
      from: '"Civic Tech Report" <civictechreport@civictechreport.com>',
      to: to,
      subject: 'Civic Tech Report: Contact form message',
      html: html,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  async sendPasswordEmail(
    email: string,
    password: string,
    orderOption: CTR_OPTION_ENUM,
  ) {
    let template = passwordRegistrationTemplate(email, password);
    if (orderOption === CTR_OPTION_ENUM.PRINTED) {
      template = passwordRegistrationPrintedTemplate(email, password);
    }
    if (orderOption === CTR_OPTION_ENUM.BUNDLE) {
      template = passwordRegistrationBundleTemplate(email, password);
    }

    await this.sendRegistrationEmail(email, template);
  }

  async sendResetPasswordEmail(email: string, password: string) {
    await this.sendRegistrationEmail(
      email,
      passwordResetTemplate(email, password),
      'Civic Tech Report: Password reset',
    );
  }

  async sendCopyEmailToPF(
    email: string,
    name: string,
    address: string,
    shippingCode: string,
    organization: string,
    phone: string,
    orderOption: string,
  ) {
    await this.sendRegistrationEmail(
      'civictech@participationfactory.com',
      copyToPFRegistrationTemplate(
        email,
        name,
        address,
        shippingCode,
        organization,
        phone,
        orderOption,
      ),
    );
  }

  async contactEmail(body: ContactDto) {
    await this.sendContactEmail(
      'civictech@participationfactory.com',
      contactFormTemplate(body),
    );
  }
}
