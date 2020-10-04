import express, { Application } from "express";
import bodyParser from "body-parser";
import { mongoConfig } from "../config";
import { middlware } from '../utils';
import path from 'path';

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
    return Promise.resolve(this);
  }

  function initStaticFile() {
    // reverse for client
    let pathClient = __dirname + '/../../client/build';
    if (process.env.NODE_ENV === 'production') {
      // build prod into dist so need to out 1 level directory
      pathClient = __dirname + '/../../../client/build';
    }
    app.use(express.static(pathClient));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(pathClient, 'index.html'));
    })
    
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
    initMiddleware,
    initStaticFile
  }
}

export default root;