import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User';
import { EHttpStatus, errorAPI } from '../utils';
import jwt from 'jsonwebtoken';
import { env } from '../config';
import { IUserId } from '../types';
import validators from '../validators';


export const register = async (req: Request, res: Response) => {
  // check validation of request 
  const [ok, errors] = validators.isOk(req);
  if (!ok) {  
    return (res.ctx.Error(EHttpStatus.StatusBadRequest, { errors: errors.array() }));
  }
  // parse body from request
  const { name, email, password } = req.body;
  try {
    // check user exist
    let user = await User.findOne({ email });
    if (user) return res.ctx.Error(EHttpStatus.StatusBadRequest,{ errors: [errorAPI.ERR_USER_EXIST] });
    // get current user 
    user = new User({ name, email, password });
    // generate salt
    const salt = await bcrypt.genSalt(10);
    // generate hash pwd
    user.password = (await bcrypt.hash(password, salt)).toString();

    // save db
    await user.save();
    // return jwt
    const payload: IUserId = { userId: user.id };
    jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: 360000
    }, (err, token) => {
      if (err) throw err;
      res.ctx.Success({ token })
    });
  } catch(e) {
    console.error(e.message);
    res.ctx.Error(EHttpStatus.StatusInternalServerError, { errors: [errorAPI.ERR_SERVER_ERROR] })
  }
}

export const login = async (req: Request, res: Response) => {
  // check validation of request 
  const [ok, errors] = validators.isOk(req);
  if (!ok) {
    return (res.ctx.Error(EHttpStatus.StatusBadRequest, { errors: errors.array() }));
  }
  // parse body from request
  const { email, password } = req.body;
  try {
    // check user exist
    let user = await User.findOne({ email });
    if (!user) return res.ctx.Error(EHttpStatus.StatusBadRequest,{ errors: [errorAPI.ERR_EMAIL_NOT_REGISTER] });
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.ctx.Error(EHttpStatus.StatusBadRequest, { errors: [errorAPI.ERR_PASSWORD_INVALID] });
    }
    // return jwt
    const payload: IUserId = { userId: user.id };
    jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: 360000
    }, (err, token) => {
      if (err) throw err;
      res.ctx.Success({ token })
    });
  } catch(e) {
    console.error(e.message);
    res.ctx.Error(EHttpStatus.StatusInternalServerError, { errors: [errorAPI.ERR_SERVER_ERROR] })
  }
}

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.ctx.Success(user);
  } catch(e) {
    res.ctx.Error(EHttpStatus.StatusInternalServerError, { errors: [errorAPI.ERR_SERVER_ERROR] });
  }
}