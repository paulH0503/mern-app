const errorAPI  = {
  // custom
  ERR_MONGODB_CONNECT_FAIL: -10,

  // ERROR API
  ERR_API_REQUIRED: '{field} is required',
  ERR_USER_EXIST: 'User already exists',
  ERR_EMAIL_NOT_REGISTER: 'Email is not register',
  ERR_PASSWORD_INVALID: 'Please check password',
  ERR_API_EMAIL_MISSING: 'Please include a valid email',
  ERR_API_NOT_VALID_LENGTH: 'Please enter a {field} with {min} or more characters',

  ERR_NOT_AUTHENTICATION: 'No token, authorization denied',
  ERR_TOKEN_NOT_VALID: 'Token is not valid',

  ERR_SERVER_ERROR: 'Server Error'
}

export default errorAPI;