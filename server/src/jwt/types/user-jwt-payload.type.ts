import * as jsonwebtoken from 'jsonwebtoken';
import { Types } from 'mongoose';

export interface UserJwtPayload extends jsonwebtoken.JwtPayload {
  username: string;
  email: string;
  isActivated: boolean;
  id: Types.ObjectId;
}
