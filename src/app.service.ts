import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TwilioClient, TwilioService } from 'nestjs-twilio';
import { Twilio } from 'twilio';

@Injectable()
export class AppService {
  private readonly twilioClient: TwilioClient;
  constructor(
    private readonly twilioService: TwilioService,
    private readonly configService: ConfigService,
  ) {
    const accountSid = configService.get('TWILIO_ACCOUNT_SID');
    const authToken = configService.get('TWILIO_AUTH_TOKEN');
    this.twilioClient = new Twilio(accountSid, authToken);
  }

  getHello(): string {
    return 'Hello World!';
  }

  smsService() {}

  async sendSMS() {
    return this.twilioService.client.messages.create({
      body: '@nestJs SMS Body \n @guardians',
      from: 'whatsapp:+14155238886',
      to: 'whatsapp:+628179183759',
      // from: this.configService.get('TWILIO_PHONE_NUMBER_FROM'),
      // to: this.configService.get('TWILIO_PHONE_NUMBER_TO'),
    });
  }
}
