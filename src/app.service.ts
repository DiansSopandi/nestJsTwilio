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
      body: '@nestJs whatsapp Body \n @guardians',
      from: this.configService.get('TWILIO_PHONE_NUMBER_FROM_WA'),
      to: this.configService.get('TWILIO_PHONE_NUMBER_TO_WA'),
      // from: this.configService.get('TWILIO_PHONE_NUMBER_FROM_SMS'),
      // to: this.configService.get('TWILIO_PHONE_NUMBER_TO_SMS'),
    });
  }
}
