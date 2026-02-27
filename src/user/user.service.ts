import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from 'src/respositories/user.respository';
import { BaseAbstractService } from 'src/services/base/base.abstract.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService extends BaseAbstractService<User> {
  constructor(
   private readonly userRepository: UserRepository
  ) {
    super(userRepository);
  }
  async create(item: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOneByCondition({ email: item.email });
    if (existingUser) {
      throw new NotFoundException('User with this email already exists');
    }
    return this.userRepository.create(item);
  }
  async getUserProfile(email: string): Promise<User> {
    const user = await this.userRepository.findOneByCondition({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
