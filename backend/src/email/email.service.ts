import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ContactDto } from './dto/contact.dto';

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

  async sendRegistrationEmail(to: string, html: string) {
    const mailOptions = {
      from: '"Civic Tech Report" <civictechreport@civictechreport.com>',
      to: to,
      subject: 'Civic Tech Report: Account created',
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

  async sendPasswordEmail(email: string, password: string) {
    const htmlTemplate = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Your New Account</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
              }
              .container {
                  background-color: #ffffff;
                  max-width: 600px;
                  margin: 20px auto;
                  padding: 20px;
                  border: 1px solid #e0e0e0;
                  border-radius: 5px;
              }
              .header {
                  text-align: center;
                  padding: 10px 0;
                  border-bottom: 1px solid #e0e0e0;
              }
              .header img {
                  max-width: 100px;
              }
              .content {
                  margin: 20px 0;
                  text-align: center;
              }
              .content p {
                  font-size: 16px;
                  color: #333333;
              }
              .content .password {
                  font-size: 24px;
                  font-weight: bold;
                  color: #1a73e8;
                  margin: 20px 0;
              }
              .footer {
                  text-align: center;
                  padding: 10px 0;
                  border-top: 1px solid #e0e0e0;
                  font-size: 12px;
                  color: #888888;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h1>
                  Civic Tech Report
                  </h1>
              </div>
              <div class="content">
                  <p>Hello,</p>
                  <p>Your new password for account:</p>
                  <p class="password">${email}</p>
                  <p>is:</p>
                  <p class="password">${password}</p>
                  <p>Please keep this password secure and do not share it with anyone.</p>
                  <p>Please note that access to the Civic Tech Market Report 2025 is currently unavailable until the full launch on September 3rd.
                    So save this email and follow us on  on LinkedIn and Facebook for further updates. </p>
              </div>
              <div class="footer">
                  <p>&copy; 2024 All rights reserved.</p>
                  <p>Please note that by placing an order, you agree to our <a href="https://drive.google.com/file/d/18b4_vOCgR_JCa-KtpHBAgo8-W3pbbNn-/view" target="_blank">Confidentiality and Non-Compete Agreement.</a></p>
              </div>
          </div>
      </body>
      </html>
    `;

    await this.sendRegistrationEmail(email, htmlTemplate);
  }

  async sendCopyEmailToPF(
    email: string,
    name: string,
    address: string,
    shippingCode: string,
    organization: string,
    phone: string,
  ) {
    const htmlTemplate = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Your New Account</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
              }
              .container {
                  background-color: #ffffff;
                  max-width: 600px;
                  margin: 20px auto;
                  padding: 20px;
                  border: 1px solid #e0e0e0;
                  border-radius: 5px;
              }
              .header {
                  text-align: center;
                  padding: 10px 0;
                  border-bottom: 1px solid #e0e0e0;
              }
              .header img {
                  max-width: 100px;
              }
              .content {
                  margin: 20px 0;
                  text-align: center;
              }
              .content p {
                  font-size: 16px;
                  color: #333333;
              }
              .content .password {
                  font-size: 24px;
                  font-weight: bold;
                  color: #1a73e8;
                  margin: 20px 0;
              }
              .footer {
                  text-align: center;
                  padding: 10px 0;
                  border-top: 1px solid #e0e0e0;
                  font-size: 12px;
                  color: #888888;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h1>
                  Civic Tech Report
                  </h1>
              </div>
              <div class="content">
                <p>Email: ${email}</p>
                <p>Name: ${name}</p>
                <p>Address: ${address}</p>
                <p>Shipping Code: ${shippingCode}</p>
                <p>Organization: ${organization}</p>
                <p>Phone: ${phone}</p>
              </div>
              <div class="footer">
                  <p>&copy; 2024 All rights reserved.</p>
              </div>
          </div>
      </body>
      </html>
    `;

    await this.sendRegistrationEmail(
      'civictechreport@civictechreport.com',
      htmlTemplate,
    );
  }

  async contactEmail(body: ContactDto) {
    const htmlTemplate = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Your New Account</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
              }
              .container {
                  background-color: #ffffff;
                  max-width: 600px;
                  margin: 20px auto;
                  padding: 20px;
                  border: 1px solid #e0e0e0;
                  border-radius: 5px;
              }
              .header {
                  text-align: center;
                  padding: 10px 0;
                  border-bottom: 1px solid #e0e0e0;
              }
              .header img {
                  max-width: 100px;
              }
              .content {
                  margin: 20px 0;
                  text-align: center;
              }
              .content p {
                  font-size: 16px;
                  color: #333333;
              }
              .content .password {
                  font-size: 24px;
                  font-weight: bold;
                  color: #1a73e8;
                  margin: 20px 0;
              }
              .footer {
                  text-align: center;
                  padding: 10px 0;
                  border-top: 1px solid #e0e0e0;
                  font-size: 12px;
                  color: #888888;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h1>
                  Civic Tech Report
                  </h1>
              </div>
              <div class="content">
                <p>Name: ${body.name}</p>
                <p>Email: ${body.email}</p>
                <p>Organization: ${body.organization}</p>
                <p>Phone: ${body.phone}</p>
                <p>Message: ${body.message}</p>
              </div>
              <div class="footer">
                  <p>&copy; 2024 All rights reserved.</p>
              </div>
          </div>
      </body>
      </html>
    `;

    await this.sendContactEmail(
      'civictechreport@civictechreport.com',
      htmlTemplate,
    );
  }
}
