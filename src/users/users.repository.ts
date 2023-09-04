import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  findUserByEmail(email: string) {
    return this.prisma.user.findFirst({
      where: { email },
    });
  }

  create(email: string, password: string) {
    return this.prisma.user.create({
      data: {
        email,
        password,
      },
    });
  }
  findUserById(id: number) {
    return this.prisma.user.findFirst({
      where: { id },
    });
  }
}
