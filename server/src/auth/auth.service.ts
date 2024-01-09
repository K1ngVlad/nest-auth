import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ActivateService } from 'src/activate/activate.service';
import { HashService } from 'src/hash/hash.service';
import { UsersService } from 'src/users/users.service';
import { MailService } from 'src/mail/mail.service';
import { LoginUserDto, RegisterUserDto, RegisteredUserDto } from './Dto';
import { JwtService } from 'src/jwt/jwt.service';
import { TokenDocument } from 'src/jwt/schemas';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private hashService: HashService,
    private activationService: ActivateService,
    private mailService: MailService,
    private jwtService: JwtService,
  ) {}

  async registration(
    registerUserDto: RegisterUserDto,
  ): Promise<RegisteredUserDto> {
    const { username, email, password } = registerUserDto;
    const candidate = await this.usersService.findOneByEmail(email);

    if (candidate) {
      throw new ConflictException(
        'Пользователь с такой электронной почтой уже существует',
      );
    }

    const hashPassword = await this.hashService.hash(password);
    const activationLink = this.activationService.generateActivationLink();

    const user = await this.usersService.create({
      ...registerUserDto,
      password: hashPassword,
      activationLink,
    });

    await this.mailService.sendActivationMail(email, activationLink, username);

    const userDto = this.usersService.getUserDto(user);
    const { refreshToken, accessToken } =
      this.jwtService.generateTokens(userDto);

    await this.jwtService.saveRefreshToken(userDto.id, refreshToken);

    return {
      refreshToken,
      accessToken,
      user: userDto,
    };
  }

  async login(loginUserDto: LoginUserDto): Promise<RegisteredUserDto> {
    const { email, password } = loginUserDto;
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Пользователь с таким именем не найден');
    }

    const isPassEquals = await this.hashService.compare(
      password,
      user.password,
    );

    if (!isPassEquals) {
      throw new UnauthorizedException('Неверный пароль');
    }

    const userDto = this.usersService.getUserDto(user);
    const { refreshToken, accessToken } =
      this.jwtService.generateTokens(userDto);

    await this.jwtService.saveRefreshToken(userDto.id, refreshToken);

    return {
      refreshToken,
      accessToken,
      user: userDto,
    };
  }

  async logout(refreshToken: string): Promise<TokenDocument> {
    return this.jwtService.removeRefreshToken(refreshToken);
  }

  async refresh(currentRefreshToken: string): Promise<RegisteredUserDto> {
    if (!currentRefreshToken) {
      throw new UnauthorizedException('Пользователь не авторизован');
    }
    const { username } =
      this.jwtService.validateRefreshToken(currentRefreshToken);
    const tokenFromDb =
      await this.jwtService.findRefreshToken(currentRefreshToken);

    if (!username || !tokenFromDb) {
      throw new UnauthorizedException('Пользователь не авторизован');
    }

    const userData = await this.usersService.findById(tokenFromDb.user);
    const userDto = this.usersService.getUserDto(userData);
    const { accessToken, refreshToken } =
      this.jwtService.generateTokens(userDto);

    return { accessToken, refreshToken, user: userDto };
  }
}
