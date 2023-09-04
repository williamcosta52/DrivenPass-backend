import { Controller, Body, Delete, UseGuards } from '@nestjs/common';
import { EraseService } from './erase.service';
import { AuthGuard } from '../guards/auth.guard';
import { EraseDto } from './dto/erase.dto';

@UseGuards(AuthGuard)
@Controller('erase')
export class EraseController {
  constructor(private readonly eraseService: EraseService) {}
  @Delete()
  remove(@Body() body: EraseDto) {
    return this.eraseService.remove(body);
  }
}
