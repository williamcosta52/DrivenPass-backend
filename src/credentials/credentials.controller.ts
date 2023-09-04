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
  HttpStatus,
} from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { AuthGuard } from '../guards/auth.guard';
import { UserIdDto } from '../users/dto/userId.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Credentials')
@UseGuards(AuthGuard)
@Controller('credentials')
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}

  @ApiOperation({
    summary: 'Create a mew credential',
    description: 'Can create a new credential when send a valid body',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'If all is ok, you receive a 201 status code',
  })
  @ApiBody({ type: CreateCredentialDto })
  @Post('create')
  create(@Body() createCredentialDto: CreateCredentialDto) {
    return this.credentialsService.create(createCredentialDto);
  }
  @ApiOperation({
    summary: 'Find one or many credentials',
    description:
      'If the user send a ID in query param, he get one credemtil, on the contrary, get all your credentials',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'If all is ok, you receive a 200 status code',
  })
  @ApiBody({ type: UserIdDto })
  @Get()
  async findOne(
    @Query('id', ParseIntPipe) id: number,
    @Body() body: UserIdDto,
  ) {
    const { userId } = body;
    return this.credentialsService.findCredentials(id, userId);
  }
  @ApiOperation({
    summary: 'Delete a credential',
    description:
      'For delete a credential, user need to send a ID credential and your userID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'If all is ok, you receive a 200 status code',
  })
  @ApiBody({ type: UserIdDto })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, body: UserIdDto) {
    return this.credentialsService.remove(id, body.userId);
  }
}
