import { IsEmail, IsNotEmpty } from 'class-validator';

class RegisterUserDto {
  @IsNotEmpty()
  readonly username: string;

  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}

export { RegisterUserDto };
