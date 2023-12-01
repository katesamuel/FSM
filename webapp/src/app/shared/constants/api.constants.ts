export class ApiRouteConstants {
// API Version
  public static API_BASE_PATH = 'internal-api';

  public static AUTHENTICATION = {
    LOGIN_CHECK: `${this.API_BASE_PATH}/auth/login-check`,
    OTP_CHECK: `${this.API_BASE_PATH}/auth/otp-check`
  }

  public static USERS = {
    CREATE: `${this.API_BASE_PATH}/user`,
    UPDATE: `${this.API_BASE_PATH}/user/USER_ID`,
    GET: `${this.API_BASE_PATH}/user/USER_ID`,
    GETALL: `${this.API_BASE_PATH}/users`,
    DELETE: `${this.API_BASE_PATH}/user/USER_ID`
  }

  public static EVENTS = {
    CREATE: `${this.API_BASE_PATH}/event`,
    UPDATE: `${this.API_BASE_PATH}/event/EVENT_ID`,
    GET: `${this.API_BASE_PATH}/event/EVENT_ID`,
    GETALL: `${this.API_BASE_PATH}/events`
  }

  public static COURSES = {
    CREATE: `${this.API_BASE_PATH}/course`,
    UPDATE: `${this.API_BASE_PATH}/course/COURSE_ID`,
    GET: `${this.API_BASE_PATH}/course/COURSE_ID`,
    GETALL: `${this.API_BASE_PATH}/courses`,
    DELETE: `${this.API_BASE_PATH}/course/COURSE_ID`
  }
}