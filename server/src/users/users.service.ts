import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from './Schemas';
import { CreateUserDto, UserDto } from './Dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  getUserDto(user: UserDocument): UserDto {
    const { username, email, isActivated, _id } = user;
    return { username, email, isActivated, id: _id };
  }

  getUserDtos(users: UserDocument[]): UserDto[] {
    return users.map((user) => this.getUserDto(user));
  }

  async findOneByEmail(email: string): Promise<UserDocument> {
    return await this.userModel.findOne({ email });
  }

  async findOneByActivationLink(activationLink: string): Promise<UserDocument> {
    return await this.userModel.findOne({ activationLink });
  }

  async create(userDto: CreateUserDto): Promise<UserDocument> {
    return await this.userModel.create(userDto);
  }

  async findById(id: Types.ObjectId): Promise<UserDocument> {
    return await this.userModel.findById(id);
  }

  async getAllUsers(): Promise<UserDocument[]> {
    return await this.userModel.find();
  }
}
