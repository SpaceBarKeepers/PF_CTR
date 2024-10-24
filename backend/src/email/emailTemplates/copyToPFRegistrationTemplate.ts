export const copyToPFRegistrationTemplate = (
  email: string,
  name: string,
  address: string,
  shippingCode: string,
  organization: string,
  phone: string,
  orderOption: string,
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
                <p>Email: ${email}</p>
                <p>Name: ${name}</p>
                <p>Address: ${address}</p>
                <p>Shipping Code: ${shippingCode}</p>
                <p>Organization: ${organization}</p>
                <p>Phone: ${phone}</p>
                <p>Order option: ${orderOption}</p>
              </div>
              <div class="footer">
                  <p>&copy; 2024 All rights reserved.</p>
              </div>
          </div>
      </body>
      </html>
    `;
