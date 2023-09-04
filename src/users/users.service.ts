import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  private SALT = 10;

  async signUp(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const verifyEmail = await this.usersRepository.findUserByEmail(email);
    if (verifyEmail)
      throw new HttpException('Email alredy exist', HttpStatus.CONFLICT);
    const hashedPassword = bcrypt.hashSync(password, this.SALT);
    return await this.usersRepository.create(email, hashedPassword);
  }
  async getUserById(id: number) {
    const user = await this.usersRepository.findUserById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
