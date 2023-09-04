import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { SignInDTO } from '../users/dto/signin-user.dto';
import { UsersService } from '../users/users.service';
import { UsersRepository } from '../users/users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  private EXPIRATION_TIME = '7 days';
  private ISSUER = 'Driven';
  private AUDIENCE = 'users';
  constructor(
    private readonly usersService: UsersService,
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUP(signUpDTO: CreateUserDto) {
    const user = await this.usersService.signUp(signUpDTO);
    return user;
  }
  async signIn(signInDTO: SignInDTO) {
    const { email, password } = signInDTO;
    const user = await this.usersRepository.findUserByEmail(email);
    if (!user)
      throw new HttpException('cannot find user', HttpStatus.UNAUTHORIZED);
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      throw new HttpException(
        'email or password wrong',
        HttpStatus.UNAUTHORIZED,
      );
    return this.createToken(user);
  }

  private createToken(user: User) {
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
