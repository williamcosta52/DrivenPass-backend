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
  HttpStatus,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { AuthGuard } from '../guards/auth.guard';
import { UserIdDto } from '../users/dto/userId.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Cards')
@UseGuards(AuthGuard)
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @ApiOperation({
    summary: 'Create a new Credit/debit card',
    description: 'When user send a valid body, a new card is create',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'If all is ok, you receive a 201 status code',
  })
  @ApiBody({ type: CreateCardDto })
  @Post()
  create(@Body() createCardDto: CreateCardDto) {
    return this.cardsService.create(createCardDto);
  }
  @ApiOperation({
    summary: 'Get a card by id',
    description:
      'If user send a ID in the query param, he get a card, if user does not send a ID, get many cards of this user',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'If all is ok, you receive a 200 status code',
  })
  @ApiBody({ type: UserIdDto })
  @Get(':id')
  findOne(@Query('id', ParseIntPipe) id: number, @Body() body: UserIdDto) {
    return this.cardsService.findOne(id, body.userId);
  }
  @ApiOperation({
    summary: 'Delete a card',
    description:
      'To Delete a card, the user need to send a id of this card and your userId ',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'If all is ok, you receive a 200 status code',
  })
  @ApiBody({ type: UserIdDto })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Body() body: UserIdDto) {
    return this.cardsService.remove(id, body.userId);
  }
}
