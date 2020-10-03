import express, { Application } from 'express';
import root from './root';
import { env } from './config';
// app
const app: Application = express();

// init
root(app)
  .initDB()
  .initMiddleware()
  .initThirdParty()
  .initRouter()

// config
const PORT = env.PORT || 5000;

// start server
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
