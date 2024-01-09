import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { HashModule } from 'src/hash/hash.module';
import { ActivateModule } from 'src/activate/activate.module';
import { MailModule } from 'src/mail/mail.module';
import { JwtModule } from 'src/jwt/jwt.module';

@Module({
  imports: [UsersModule, HashModule, ActivateModule, MailModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
