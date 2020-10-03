import { Request, Response, NextFunction } from "express";
import validators from "../validators";
import { EHttpStatus } from '../utils';

export class HTTPContext {
  constructor(public response: Response) {}
  Error(code: EHttpStatus, jsonResp: any) {
    return this.response.status(code).json(jsonResp);
  }
  Success(jsonResp: any) {
    return this.response.status(EHttpStatus.StatusOK).json(jsonResp);
  }
}

const context = function (req: Request, res: Response, next: NextFunction) {
  // set context
  res.ctx = new HTTPContext(res);
  next();
}

export default context;