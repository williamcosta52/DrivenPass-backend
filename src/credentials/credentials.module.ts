import { Module } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { CredentialsController } from './credentials.controller';
import { CredentialsRepository } from './credentials.repository';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [CredentialsController],
  providers: [CredentialsService, CredentialsRepository],
  imports: [AuthModule, UsersModule],
})
export class CredentialsModule {}
