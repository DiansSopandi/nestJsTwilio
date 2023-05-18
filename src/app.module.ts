import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TwilioModule } from 'nestjs-twilio';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      // envFilePath: `${configDir}/${environment}.env`,
      envFilePath: process.env.NODE_ENV,
      expandVariables: true,
      isGlobal: true,
    }),
    /**
     TwilioModule.forRoot({
       accountSid: process.env.TWILIO_ACCOUNT_SID,
       authToken: process.env.TWILIO_AUTH_TOKEN,
     }),
     */
    TwilioModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        accountSid: configService.get<string>('TWILIO_ACCOUNT_SID'),
        authToken: configService.get<string>('TWILIO_AUTH_TOKEN'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_CONSTRING'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
