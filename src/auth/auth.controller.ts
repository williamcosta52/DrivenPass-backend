import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { SignInDTO } from '../users/dto/signin-user.dto';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth users')
@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Create a user',
    description: 'When user send a valid body, can create a new user account',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'If all is ok, you receive a 200 status code',
  })
  @ApiBody({ type: CreateUserDto })
  @Post('sign-up')
  signUp(@Body() signUpDTO: CreateUserDto) {
    return this.authService.signUP(signUpDTO);
  }

  @ApiOperation({
    summary: 'Make login',
    description:
      'When user send a valid body (email and password) can access your account',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'If all is ok, you receive a 201 status code',
  })
  @ApiBody({ type: SignInDTO })
  @Post('sign-in')
  signIn(@Body() signInDTO: SignInDTO) {
    return this.authService.signIn(signInDTO);
  }
}
