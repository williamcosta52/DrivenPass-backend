import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { AuthGuard } from '../guards/auth.guard';
import { UserIdDto } from '../users/dto/userId.dto';

@UseGuards(AuthGuard)
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  create(@Body() createCardDto: CreateCardDto) {
    return this.cardsService.create(createCardDto);
  }
  @Get(':id')
  findOne(@Query('id', ParseIntPipe) id: number, @Body() body: UserIdDto) {
    return this.cardsService.findOne(id, body.userId);
  }
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Body() body: UserIdDto) {
    return this.cardsService.remove(id, body.userId);
  }
}
