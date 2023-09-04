import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CardsRepository } from './cards.repository';

@Injectable()
export class CardsService {
  constructor(private readonly cardsRepository: CardsRepository) {}

  async create(createCardDto: CreateCardDto) {
    const card = await this.cardsRepository.findCardByTitle(
      createCardDto.title,
    );
    if (card) throw new ConflictException();
    return this.cardsRepository.createCard(createCardDto);
  }
  async findOne(id: number, userId: number) {
    const card = await this.cardsRepository.findCardById(id);
    if (card.userId !== userId) throw new ForbiddenException();
    if (!card) throw new NotFoundException();
    return card;
  }
  async remove(id: number, userId: number) {
    const card = await this.cardsRepository.findCardById(id);
    if (card.userId !== userId) throw new ForbiddenException();
    if (!card) throw new NotFoundException();
    return this.cardsRepository.delete(id);
  }
}
