import { Application } from "express";
import bodyParser from "body-parser";
import { mongoConfig } from "../config";
import { middlware } from '../utils';

function root(app: Application) {

  function initDB() {
    mongoConfig.connectMongoDB();
    return this;
  }

  function initThirdParty() {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    return this;
  }

  async function initRouter() {
    app.use('/api/user', (await import('../routes/api/user')).default());
    app.use('/api/auth', (await import('../routes/api/auth')).default());
    return this;
  }

  function initMiddleware() {
    app.use(middlware.context);
    return this;
  }

  return {
    initDB,
    initThirdParty,
    initRouter,
    initMiddleware
  }
}

export default root;