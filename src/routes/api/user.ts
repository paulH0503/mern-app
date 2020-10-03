import express from 'express';
import validators from '../../validators';
import { middlware } from '../../utils';
import controller from '../../controller';

const router = express.Router();

const all = () => {
  publicRoute(middlware.context);
  privateRoute();
  return router;
}

const privateRoute = () => {

}

const publicRoute = (context: any) => {
  // @route   GET api/user
  // #desc    Register
  router.post('/', context, [
    validators.isNotEmpty('name'),
    validators.isEmail('email'),
    validators.isMinLength('password', 6)
  ], controller.user.register);
}

export default all;