import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotesRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(createNoteDto: CreateNoteDto) {
    const { note, title, userId } = createNoteDto;
    return this.prisma.notes.create({
      data: {
        note,
        title,
        userId,
      },
    });
  }
  findUserNotesByTitle(title: string) {
    return this.prisma.notes.findFirst({
      where: { title },
    });
  }
  findNotesById(id: number) {
    return this.prisma.notes.findFirst({
      where: { id },
    });
  }
  findAllNotes(userId: number) {
    return this.prisma.notes.findMany({
      where: { userId },
    });
  }
  delete(id: number) {
    return this.prisma.notes.delete({
      where: { id },
    });
  }
}
