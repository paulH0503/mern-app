const { check, validationResult } = require("express-validator");
const { errorAPI } = require('../utils');
import { Request } from 'express';

const isNotEmpty = (field: string) => {
  return check(field, errorAPI.ERR_API_REQUIRED.replace('{field}', field)).not().isEmpty()
}

const isEmail = (field: string) => {
  return check(field, errorAPI.ERR_API_EMAIL_MISSING).isEmail()
}

const isMinLength = (field: string, min: number) => {
  console.log( errorAPI.ERR_API_NOT_VALID_LENGTH
    .replace('{field}', field)
    .replace('{min}', min))
  return check(field, 
      errorAPI.ERR_API_NOT_VALID_LENGTH
      .replace('{field}', field)
      .replace('{min}', min)
  ).isLength({ min: min })
}

const isOk = (req: Request) => {
  const errors = validationResult(req);
  return [errors.isEmpty(), errors]
}

export = {
  isNotEmpty,
  isEmail,
  isMinLength,

  // result of validation
  isOk
}