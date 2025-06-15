import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class SimpleAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers['x-admin-token'];

    if (!token || token !== process.env.ADMIN_TOKEN) {
      throw new UnauthorizedException('Access denied');
    }

    return true;
  }
}
