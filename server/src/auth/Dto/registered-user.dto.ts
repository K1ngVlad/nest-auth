import { UserDto } from 'src/users/Dto';

class RegisteredUserDto {
  readonly user: UserDto;
  readonly refreshToken: string;
  readonly accessToken: string;
}

export { RegisteredUserDto };
