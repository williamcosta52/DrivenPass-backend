import { Controller, Get, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Health')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    summary: 'Check the API health',
    description: 'send a request do /health to check API health',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'If all is ok, you receive a 200 status code',
  })
  @Get('/health')
  getHealth(): string {
    return this.appService.getHealth();
  }
}
