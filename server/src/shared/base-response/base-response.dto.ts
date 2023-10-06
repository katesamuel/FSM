import { IBaseResponse } from './base-response.interface';

export class BaseResponse implements IBaseResponse {
  status: string;
  result_length: number;
  results?: unknown[];

  constructor(status, message, body?) {
    this.status = message ? message : 'OK';
    if (body) {
      if (!isNaN(body.length)) {
        this.result_length = body.length;
      } else {
        this.result_length = 1;
      }
      this.results = body;
    }
  }
}
