import { IsEmail, IsNotEmpty } from 'class-validator';

class LoginUserDto {
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}

export { LoginUserDto };
