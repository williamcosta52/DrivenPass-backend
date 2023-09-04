import { Module } from '@nestjs/common';
import { EraseService } from './erase.service';
import { EraseController } from './erase.controller';
import { EraseRepository } from './erase.repository';
import { CardsModule } from '../cards/cards.module';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [EraseController],
  providers: [EraseService, EraseRepository, CardsModule],
  imports: [AuthModule, UsersModule],
})
export class EraseModule {}
