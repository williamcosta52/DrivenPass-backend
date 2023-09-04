import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { NotesRepository } from './notes.repository';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [NotesController],
  providers: [NotesService, NotesRepository],
  imports: [AuthModule, UsersModule],
})
export class NotesModule {}
