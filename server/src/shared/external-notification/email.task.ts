import { Logger } from '@nestjs/common';
import sgMail = require('@sendgrid/mail');

export default class EmailTask {
  private readonly _logger = new Logger(process.env.APPLICATION_NAME);

  sendUserWelcomeEmail = (recipientEmail, recipientName, password) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: recipientEmail,
      from: process.env.SENDER_EMAIL,
      subject: `Welcome to ${process.env.APPLICATION_NAME}!`,
      template_id: process.env.USER_WELCOME_TEMPLATE_ID,
      dynamic_template_data: {
        username: recipientName,
        email: recipientEmail,
        password,
      },
      content: undefined,
    };
    sgMail
      .send(msg)
      .then(() => {
        this._logger.error(
          `Welcome email sent succesfully: ${recipientName}(${recipientEmail})`,
        );
      })
      .catch((error) => {
        this._logger.error(`Error in sending email: ${error.toString()}`);
      });
  };

  sendOTPEmail = (recipientEmail, recipientName, otpCode) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: recipientEmail,
      from: process.env.SENDER_EMAIL,
      subject: `${recipientName}(${recipientEmail} - One Time Password`,
      template_id: process.env.LOGIN_OTP_TEMPLATE_ID,
      dynamic_template_data: {
        username: recipientName,
        otp: otpCode,
      },
      content: undefined,
    };
    sgMail
      .send(msg)
      .then(() => {
        this._logger.error(
          `OTP email sent succesfully: ${recipientName}(${recipientEmail})`,
        );
      })
      .catch((error) => {
        this._logger.error(`Error in sending email: ${error.toString()}`);
      });
  };

  sendTextEmail = (emailSubject, recipientEmail, emailBody) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: recipientEmail,
      from: process.env.SENDER_EMAIL,
      subject: emailSubject,
      text: emailBody,
    };
    sgMail
      .send(msg)
      .then(() => {
        this._logger.error(
          `Text email sent succesfully: ${emailSubject}(${recipientEmail})`,
        );
      })
      .catch((error) => {
        this._logger.error(`Error in sending email: ${error.toString()}`);
      });
  };
}
