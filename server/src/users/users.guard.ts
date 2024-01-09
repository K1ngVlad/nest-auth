import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from 'src/jwt/jwt.service';

@Injectable()
export class UsersGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    try {
      const request = context.switchToHttp().getRequest<Request>();
      const authorizationHeader = request.headers.authorization;

      if (!authorizationHeader) return false;

      const acessToken = authorizationHeader.split(' ')[1];

      if (!acessToken) return false;

      const userJwtPayload = this.jwtService.validateAccessToken(acessToken);

      if (!userJwtPayload) return false;

      return true;
    } catch (error) {
      return false;
    }
  }
}
