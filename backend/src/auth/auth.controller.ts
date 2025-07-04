import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  UseGuards,
  Get,
} from '@nestjs/common';
import { SimpleAuthGuard } from './simple-auth.guard.js';

@Controller('auth')
export class AuthController {
  @Post('login')
  login(@Body('password') password: string) {
    if (password !== process.env.ADMIN_PASSWORD) {
      throw new UnauthorizedException('Невірний пароль');
    }

    return {
      token: process.env.ADMIN_TOKEN,
    };
  }

  @Get('current')
  @UseGuards(SimpleAuthGuard)
  current() {
    return { ok: true };
  }
}
