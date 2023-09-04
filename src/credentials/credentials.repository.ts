import { Injectable } from '@nestjs/common';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CredentialsRepository {
  constructor(private readonly prisma: PrismaService) {}
  private HASHE: 10;

  findUserCredentialsByTitle(title: string) {
    return this.prisma.credential.findFirst({
      where: { title },
    });
  }

  createCredentials(createCredential: CreateCredentialDto) {
    const { url, title, username, password, userId } = createCredential;
    const hashedPassword = bcrypt.hashSync(password, this.HASHE);
    return this.prisma.credential.create({
      data: {
        url,
        title,
        username,
        hashedPassword,
        password,
        userId,
      },
    });
  }
  findCredentialById(id: number) {
    return this.prisma.credential.findFirst({
      where: { id },
    });
  }
  findCredentials(userId: number) {
    return this.prisma.credential.findMany({
      where: { userId },
    });
  }
  deleteCredential(id: number) {
    return this.prisma.credential.delete({
      where: { id },
    });
  }
}
