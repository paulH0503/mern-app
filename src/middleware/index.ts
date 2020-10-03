import context from './context';
import auth from './auth';

export default {
  context: [context],
  auth: [context, auth]
}