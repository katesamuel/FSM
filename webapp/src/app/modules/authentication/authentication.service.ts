import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { ApiRouteConstants } from "src/app/shared/constants/api.constants";
import { User, Permission } from "src/app/shared/models";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  //public
  public currentUser: Observable<User>;

  //private
  private currentUserSubject: BehaviorSubject<User>;

  /**
   *
   * @param {HttpClient} _http
   * @param {ToastrService} _toastrService
   */
  constructor(
    private _http: HttpClient,
    private _router: Router
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(''));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // getter: currentUserValue
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  /**
   *  Confirms if user is admin
   */
  get isAdmin() {
    return this.currentUser && (this.currentUserSubject.value.role === Permission.Admin || this.currentUserSubject.value.role === Permission.SuperAdmin);
  }

  /**
   * User login
   *
   * @param phoneCode
   * @param mobile
   * @param loginSource
   * @returns user
   */
  loginCheck(phoneCode: string, mobile: string, loginSource: string) {
    return this._http.post<any>(ApiRouteConstants.AUTHENTICATION.LOGIN_CHECK, { phoneCode, mobile, loginSource }).pipe(
      map((response) => {
        if (response && response.status === "OK") {
          return response.results;
        } else {
          throw new Error("Error Occurred. Contact Support!");
        }
      })
    );
  }

  /**
   * User login
   *
   * @param phoneCode
   * @param mobile
   * @param loginSource
   * @param otpCode
   * @returns user
   */
  otpCheck(phoneCode: string, mobile: string, loginSource: string, otpCode: string) {
    return this._http.post<any>(ApiRouteConstants.AUTHENTICATION.OTP_CHECK, { phoneCode, mobile, loginSource, otpCode }).pipe(
      map((user) => {
        // login successful if there's a jwt token in the response
        if (user && user.results.length > 0 && user.results[0].accessToken && (user.results[0].permissions.includes(Permission.SuperAdmin) || user.results[0].permissions.includes(Permission.UserReadOnly))) {
          const userDetails = user.results[0];

          // notify
          this.currentUserSubject.next(userDetails);
        } else {
          if (!user.results[0].permissions.includes(Permission.UserReadOnly)) {
            throw new Error("Access Restricted. Contact Support!");
          } else {
            throw new Error("Error Occurred. Contact Support!");
          }
        }
      })
    );
  }

  login(phoneCode: string, mobile: string, password: string) {
    return this._http.post<any>(ApiRouteConstants.AUTHENTICATION.OTP_CHECK, { phoneCode, mobile, password }).pipe(
      map((user) => {
        // login successful if there's a jwt token in the response
        if (user && user.userToken) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
         

          // notify
          
        }

        return user;
      })
    );
  }

  /**
   * User logout
   *
   */
  logout() {
    // remove user from local storage to log user out
    
    // notify
    
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

}
