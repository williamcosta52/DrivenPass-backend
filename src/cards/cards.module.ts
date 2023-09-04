import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { CardsRepository } from './cards.repository';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [CardsController],
  providers: [CardsService, CardsRepository],
  imports: [AuthModule, UsersModule],
})
export class CardsModule {}
