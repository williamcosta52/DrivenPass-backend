import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const verifyEmail = await this.usersRepository.findUserByEmail(email);
    if (verifyEmail)
      throw new HttpException('Email alredy exist', HttpStatus.CONFLICT);
    const hashedPassword = bcrypt.hashSync(password, 10);
    return await this.usersRepository.create(email, hashedPassword);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
