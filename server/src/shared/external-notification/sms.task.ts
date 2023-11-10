import { Logger } from '@nestjs/common';
import axios from 'axios';

export default class SmsTask {
  private readonly _logger = new Logger(process.env.APPLICATION_NAME);

  sendOTPSms = (recepientNumbers, OTPCode) => {
    const message = `${OTPCode} is your OTP for logging into the ChurchBell app. Please do not share this OTP. Powered By Fronsline.`;
    const data = {};
    const params = new URLSearchParams({
      apikey: process.env.TEXTLOCAL_APIKEY,
      message,
      sender: process.env.TEXTLOCAL_SENDER,
      numbers: recepientNumbers,
    }).toString();

    const url = `${process.env.TEXTLOCAL_API_URL}?${params}`;
    axios
      .post(url, data, {})
      .then(() => {
        this._logger.error(
          `OTP sms is sent succesfully: (${recepientNumbers})`,
        );
      })
      .catch((err) => {
        this._logger.error(`Error in sending OTP sms: ${err.toString()}`);
      });
  };
}
