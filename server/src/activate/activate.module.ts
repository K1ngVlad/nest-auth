import { Module } from '@nestjs/common';
import { ActivateController } from './activate.controller';
import { ActivateService } from './activate.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [ActivateController],
  providers: [ActivateService],
  exports: [ActivateService],
})
export class ActivateModule {}
