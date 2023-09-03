import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { SignInDTO } from './dto/signin-user.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}
  private EXPIRATION_TIME = '7 days';
  private ISSUER = 'Driven';
  private AUDIENCE = 'users';

  async signUp(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const verifyEmail = await this.usersRepository.findUserByEmail(email);
    if (verifyEmail)
      throw new HttpException('Email alredy exist', HttpStatus.CONFLICT);
    const hashedPassword = bcrypt.hashSync(password, 10);
    return await this.usersRepository.create(email, hashedPassword);
  }
  async signIn(signInDTO: SignInDTO) {
    const { email, password } = signInDTO;
    const user = await this.usersRepository.findUserByEmail(email);
    if (!user)
      throw new HttpException('cannot find user', HttpStatus.UNAUTHORIZED);
    const verifyPassword = bcrypt.compareSync(password, user.password);
    if (!verifyPassword)
      throw new HttpException(
        'email or password wrong',
        HttpStatus.UNAUTHORIZED,
      );

    return this.createToken(user);
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

  private async createToken(user: User) {
    const { id, email } = user;

    const token = this.jwtService.sign(
      { email },
      {
        expiresIn: this.EXPIRATION_TIME,
        subject: String(id),
        issuer: this.ISSUER,
        audience: this.AUDIENCE,
      },
    );

    return { token };
  }
}
