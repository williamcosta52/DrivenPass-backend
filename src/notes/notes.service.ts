import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { NotesRepository } from './notes.repository';

@Injectable()
export class NotesService {
  constructor(private readonly notesRepository: NotesRepository) {}

  async create(createNoteDto: CreateNoteDto) {
    const findUserNotes = await this.notesRepository.findUserNotesByTitle(
      createNoteDto.title,
    );
    if (findUserNotes) throw new ConflictException();
    return this.notesRepository.create(createNoteDto);
  }
  async findNotes(id: number, userId: number) {
    const note = await this.notesRepository.findNotesById(id);
    if (note.userId !== userId) throw new ForbiddenException();
    if (!note) throw new NotFoundException();
    if (!id) {
      return this.notesRepository.findAllNotes(userId);
    }
    return note;
  }
  async remove(id: number, userId: number) {
    const note = await this.notesRepository.findNotesById(id);
    if (!note) throw new NotFoundException();
    if (note.userId !== userId) throw new ForbiddenException();
    return this.notesRepository.delete(id);
  }
}
