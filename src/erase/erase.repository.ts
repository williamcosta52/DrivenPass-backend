import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EraseRepository {
  constructor(private readonly prisma: PrismaService) {}

  findUserById(id: number) {
    return this.prisma.user.findFirst({
      where: { id },
    });
  }
  deleteCard(userId: number) {
    return this.prisma.card.deleteMany({
      where: { userId },
    });
  }
  deleteCredentials(userId: number) {
    return this.prisma.credential.deleteMany({
      where: { userId },
    });
  }
  deleteNotes(userId: number) {
    return this.prisma.notes.deleteMany({
      where: { userId },
    });
  }
  deleteUser(userId: number) {
    return this.prisma.user.delete({
      where: { id: userId },
    });
  }
}
