import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserPermission } from 'src/modules/user/enum/user-permission.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requirePermissions = this.reflector.getAllAndOverride<
      UserPermission[]
    >('permissions', [context.getHandler(), context.getClass()]);
    if (!requirePermissions) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const filteredPermission = requirePermissions?.filter((value) =>
      user.permissions?.includes(value),
    );
    // console.log('-----------------------------');
    // console.log('Required - ' + requirePermissions);
    // console.log('User - ' + user.permissions);
    // console.log('Path - ' + request.route.path);
    // console.log('Filtered Permission - ' + filteredPermission);
    // console.log('-----------------------------');
    return filteredPermission && filteredPermission.length > 0;
  }
}
