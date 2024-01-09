import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersGuard } from './users.guard';
import { UserDto } from './Dto';
import { Types } from 'mongoose';

@Controller('users')
@UseGuards(UsersGuard)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getAll(): Promise<UserDto[]> {
    const users = await this.userService.getAllUsers();
    return this.userService.getUserDtos(users);
  }

  @Get(':id')
  async getOne(@Param('id') id: Types.ObjectId) {
    const user = await this.userService.findById(id);
    return this.userService.getUserDto(user);
  }
}
