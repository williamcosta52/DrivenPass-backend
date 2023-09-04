import {
  Controller,
  Body,
  Delete,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { EraseService } from './erase.service';
import { AuthGuard } from '../guards/auth.guard';
import { EraseDto } from './dto/erase.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Erase')
@UseGuards(AuthGuard)
@Controller('erase')
export class EraseController {
  constructor(private readonly eraseService: EraseService) {}
  @ApiOperation({
    summary: 'Delete cards, credentials, notes and user account',
    description:
      'Delete all things saved of this user, including your account (need a password confirmation)',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'If all is ok, you receive a 200 status code',
  })
  @ApiBody({ type: EraseDto })
  @Delete()
  remove(@Body() body: EraseDto) {
    return this.eraseService.remove(body);
  }
}
