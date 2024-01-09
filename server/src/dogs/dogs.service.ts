import { Injectable } from '@nestjs/common';
import { CreateDogDto, UpdateDogDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { Dog, DogDocument } from './schemas';
import { Model } from 'mongoose';

@Injectable()
export class DogsService {
  constructor(@InjectModel(Dog.name) private dogModel: Model<DogDocument>) {}

  async getAll(): Promise<Dog[]> {
    return this.dogModel.find().exec();
  }

  async getById(id: string): Promise<Dog> {
    return this.dogModel.findById(id);
  }

  async create(dogDto: CreateDogDto): Promise<Dog> {
    const newDog = new this.dogModel(dogDto);
    return newDog.save();
  }

  async remove(id: string) {
    return this.dogModel.findByIdAndDelete(id);
  }

  async update(dogDto: UpdateDogDto, id: string): Promise<Dog> {
    return this.dogModel.findByIdAndUpdate(id, dogDto, { new: true });
  }
}
