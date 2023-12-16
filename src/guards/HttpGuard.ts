import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class HttpGuard implements CanActivate {
  constructor(private reflect: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const roles = this.reflect.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    if (roles.includes('admin')) {
      return false;
    }
  }
}
