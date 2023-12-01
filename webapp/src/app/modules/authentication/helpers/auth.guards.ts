import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../authentication.service';
import { Permission } from 'src/app/shared/models';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  /**
   *
   * @param {Router} _router
   * @param {AuthenticationService} _authenticationService
   */
  constructor(private _router: Router, private _authenticationService: AuthenticationService) { }

  // canActivate
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this._authenticationService.currentUserValue;

    if (currentUser) {
      // check if route is restricted by permissions
      const routePermissions = route.data?.['permissions'] ? route.data?.['permissions'] : route.firstChild?.data?.['permissions'] ? route.firstChild?.data?.['permissions'] : null;
      const filteredPermission = routePermissions?.filter((value: string) => currentUser.permissions?.includes(value));
      // console.log(currentUser.permissions);
      // console.log(routePermissions);
      const subscriptionStatus = undefined;
      if (
        state.url !== '/navbar/payment' &&
        (subscriptionStatus === "incomplete" ||
        subscriptionStatus === "incomplete_expired" ||
        subscriptionStatus === "canceled" ||
        subscriptionStatus === "unpaid" ||
        subscriptionStatus === "past_due" ||
        subscriptionStatus === "paused") &&
        !currentUser.permissions.includes(Permission.SuperAdmin)
      ) {
        this._router.navigate(['/navbar/payment']);
        return true;
      }

      if (filteredPermission && filteredPermission.length === 0) {
        if(currentUser.permissions.includes(Permission.SuperAdmin) || currentUser.permissions.includes(Permission.Admin)) {
          this._router.navigate(['/dashboard/home']);
          return false;
        } else if(currentUser.permissions.includes(Permission.Admin) || currentUser.permissions.includes(Permission.UserReadOnly)) {
          this._router.navigate(['/apps/member']);
          return false;
        } else if(currentUser.permissions.includes(Permission.TransactionAdmin) || currentUser.permissions.includes(Permission.TransactionReadOnly)) {
          this._router.navigate(['/apps/transaction']);
          return false;
        } else if(currentUser.permissions.includes(Permission.EventAdmin) || currentUser.permissions.includes(Permission.EventReadOnly)) {
          this._router.navigate(['/apps/event']);
          return false;
        } else {
          this._authenticationService.logout();
          return false;
        }
      }

      return true;
    } else {
      // not logged in so redirect to login page with the return url
      this._router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }
}
