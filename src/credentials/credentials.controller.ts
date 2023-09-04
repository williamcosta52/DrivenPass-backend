import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { AuthGuard } from '../guards/auth.guard';
import { UserIdDto } from '../users/dto/userId.dto';

@UseGuards(AuthGuard)
@Controller('credentials')
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}
  @Post('create')
  create(@Body() createCredentialDto: CreateCredentialDto) {
    return this.credentialsService.create(createCredentialDto);
  }
  @Get()
  async findOne(
    @Query('id', ParseIntPipe) id: number,
    @Body() body: UserIdDto,
  ) {
    const { userId } = body;
    return this.credentialsService.findCredentials(id, userId);
  }
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, body: UserIdDto) {
    return this.credentialsService.remove(id, body.userId);
  }
}
