import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/users/Schemas';

export type TokenDocument = Token & Document;

@Schema()
export class Token {
  @Prop({ ref: User.name })
  user: Types.ObjectId;

  @Prop({ required: true })
  refreshToken: string;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
