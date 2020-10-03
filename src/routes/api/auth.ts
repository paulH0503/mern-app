import express, { Request, Response } from "express";
import { middlware, EHttpStatus, errorAPI } from "../../utils";
import User from "../../models/User";
import validators from "../../validators";
import controller from '../../controller';

const router = express.Router();

const all = () => {
  publicRoute();
  privateRoute();
  return router;
}

const publicRoute = () => {
  // @route   POST api/auth
  // #desc    Login
  router.post('/', middlware.context, [
    validators.isEmail('email'),
    validators.isMinLength('password', 6)
  ], controller.user.login);
}

const privateRoute = () => {
  // @route   GET api/auth
  // @desc    Get User
  router.get('/', middlware.auth, controller.user.getUser);
}

export default all;