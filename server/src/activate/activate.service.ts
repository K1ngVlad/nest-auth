import { BadRequestException, Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import { UserDocument } from 'src/users/Schemas';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ActivateService {
  constructor(private usersService: UsersService) {}

  generateActivationLink(): string {
    return `${process.env.API_URL}/activate/${uuid.v4()}`;
  }

  async activate(activationLink: string): Promise<UserDocument> {
    const user =
      await this.usersService.findOneByActivationLink(activationLink);

    if (!user) {
      throw new BadRequestException('Некорректная ссылка активации');
    }

    user.isActivated = true;

    return user.save();
  }
}
