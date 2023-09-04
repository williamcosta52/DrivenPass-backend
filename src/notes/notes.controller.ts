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
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { AuthGuard } from '../guards/auth.guard';
import { UserIdDto } from '../users/dto/userId.dto';

@UseGuards(AuthGuard)
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
  }
  @Get(':id')
  findOne(@Query('id', ParseIntPipe) id: number, @Body() body: UserIdDto) {
    return this.notesService.findNotes(id, body.userId);
  }
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Body() body: UserIdDto) {
    return this.notesService.remove(id, body.userId);
  }
}
