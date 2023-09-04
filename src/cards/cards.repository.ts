import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCardDto } from './dto/create-card.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CardsRepository {
  constructor(private readonly prisma: PrismaService) {}
  private HASH: 10;

  findCardByTitle(title: string) {
    return this.prisma.card.findFirst({
      where: { title },
    });
  }
  createCard(createCardDto: CreateCardDto) {
    const {
      number,
      isVirtual,
      name,
      cvv,
      expirationDate,
      password,
      type,
      title,
      userId,
    } = createCardDto;
    return this.prisma.card.create({
      data: {
        cvv: bcrypt.hashSync(String(cvv), this.HASH),
        expirationDate,
        isVirtual,
        name,
        number,
        password: bcrypt.hashSync(password, this.HASH),
        title,
        userId,
        type,
      },
    });
  }
  findCardById(id: number) {
    return this.prisma.card.findFirst({
      where: { id },
    });
  }
  delete(id: number) {
    return this.prisma.card.delete({
      where: { id },
    });
  }
}
