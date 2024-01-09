import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtService } from './jwt.service';
import { Token, TokenSchema } from './schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Token.name,
        schema: TokenSchema,
      },
    ]),
  ],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule {}
