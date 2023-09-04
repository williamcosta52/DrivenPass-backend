import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [],
  providers: [UsersService, UsersRepository, JwtService],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
