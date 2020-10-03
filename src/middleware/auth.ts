import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { env } from '../config';
import EHttpStatus from "../utils/http-status";
import errorAPI from "../utils/error";

const auth = function (req: Request, res: Response, next: NextFunction) {
  // get token from header
  const token = req.header('x-auth-token');
  // check if not token
  if (!token) {
    return res.ctx.Error(EHttpStatus.StatusUnauthorized, { errors: [errorAPI.ERR_NOT_AUTHENTICATION] });
  }
  // Verify token
  try {
    const decodeJwt = jwt.verify(token, env.JWT_SECRET);
    console.log("decodeJwt", decodeJwt);
    req.userId = (decodeJwt as any).userId;
    next();
  } catch(e) {
    return res.ctx.Error(EHttpStatus.StatusUnauthorized, { errors: [errorAPI.ERR_TOKEN_NOT_VALID] });
  }
}

export default auth;