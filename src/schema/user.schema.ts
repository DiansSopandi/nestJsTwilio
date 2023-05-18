import { Injectable } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Injectable()
@Schema({ versionKey: false })
export class User {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
  })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  phoneNumber: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  isPhoneConfirmed: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ email: 1, phoneNumber: 1 }, { unique: true });
