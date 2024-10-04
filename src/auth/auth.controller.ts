import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register.dto';
import { LoginUserDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  registerUser(@Body() userObject: RegisterUserDto) {
    return this.authService.register(userObject);
  }

  @Post('login')
  loginUser(@Body() userObject: LoginUserDto) {
    return this.authService.login(userObject);
  }
}
