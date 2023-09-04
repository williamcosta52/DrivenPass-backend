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
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { AuthGuard } from '../guards/auth.guard';
import { UserIdDto } from '../users/dto/userId.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Notes')
@UseGuards(AuthGuard)
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @ApiOperation({
    summary: 'Create a new note',
    description: 'Can create a new Note',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'If all is ok, you receive a 201 status code',
  })
  @ApiBody({ type: CreateNoteDto })
  @Post()
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
  }
  @ApiOperation({
    summary: 'Get one or many notes',
    description:
      'If user send an ID, send one note, on the contrary, send all the notes to user',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'If all is ok, you receive a 200 status code',
  })
  @ApiBody({ type: UserIdDto })
  @Get(':id')
  findOne(@Query('id', ParseIntPipe) id: number, @Body() body: UserIdDto) {
    return this.notesService.findNotes(id, body.userId);
  }
  @ApiOperation({
    summary: 'Delete a note',
    description: 'User need to send a note ID and userId to delete a Note',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'If all is ok, you receive a 200 status code',
  })
  @ApiBody({ type: UserIdDto })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Body() body: UserIdDto) {
    return this.notesService.remove(id, body.userId);
  }
}
