import express, { Application } from 'express';
import root from './src/root';
import { env } from './src/config';
import path from 'path';
// app
const app: Application = express();

// init
root(app)
.initDB()
.initMiddleware()
.initThirdParty()
.initRouter().then((el: any) => {
  el.initStaticFile()
})

// config
const PORT = env.PORT || 5000;

// start server
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
