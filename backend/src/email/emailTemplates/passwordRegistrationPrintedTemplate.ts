export const passwordRegistrationPrintedTemplate = (
  email: string,
  password: string,
) => `
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
                  <p>Thank You for Your Purchase!</p>
                  <p>We are excited to see your interest in digital participation and engagement, and we sincerely appreciate your trust in us. Digital access to the Civic Tech Market Report 2025 should now be available to you, and we can't wait for you to dive into this comprehensive guide.</p>
                  <p>Please note that the printed copy will be shipped shortly, and we will send you shipping information via the email used for your purchase as soon as possible.</p>
                  <p>In the meantime, stay connected and get the latest updates by following us on
                      <a href={'https://www.linkedin.com/company/participation-factory/'} target={'_blank'}>
                        LinkedIn
                      </a> 
                  and 
                      <a href={'https://www.facebook.com/participationfactory'} target={'_blank'}>
                        Facebook
                      </a>
                  .</p>
                  <p>Your new password for account:</p>
                  <p class="password">${email}</p>
                  <p>is:</p>
                  <p class="password">${password}</p>
                  <p>Please keep this password secure and do not share it with anyone.</p>
                  <p>Thank you once again for your purchase and your interest in civic technology!</p>
                  <p>Sincerely,<br>Participation Factory team</p>
              </div>
              <div class="footer">
                  <p>&copy; 2024 All rights reserved.</p>
                  <p>Please note that by placing an order, you agree to our <a href="https://drive.google.com/file/d/18b4_vOCgR_JCa-KtpHBAgo8-W3pbbNn-/view" target="_blank">Confidentiality and Non-Compete Agreement.</a></p>
              </div>
          </div>
      </body>
      </html>
    `;
