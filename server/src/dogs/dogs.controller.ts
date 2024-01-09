import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CreateDogDto, UpdateDogDto } from './dto';
import { DogsService } from './dogs.service';
import { Dog } from './schemas';

@Controller('dogs')
export class DogsController {
  constructor(private readonly dogsService: DogsService) {}

  @Get()
  getAll(): Promise<Dog[]> {
    return this.dogsService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Dog> {
    return this.dogsService.getById(id);
  }

  @Post()
  createOne(@Body() dogDto: CreateDogDto): Promise<Dog> {
    return this.dogsService.create(dogDto);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.dogsService.remove(id);
  }

  @Put(':id')
  updateOne(
    @Body() dogDto: UpdateDogDto,
    @Param('id') id: string,
  ): Promise<Dog> {
    return this.dogsService.update(dogDto, id);
  }
}
