import { Types } from 'mongoose';

class UserDto {
  readonly username: string;
  readonly email: string;
  readonly isActivated: boolean;
  readonly id: Types.ObjectId;
}

export { UserDto };
