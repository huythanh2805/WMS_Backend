import { Injectable } from '@nestjs/common';
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
}
