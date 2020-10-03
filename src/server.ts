import express, { Application } from 'express';
import root from './root';
import { env } from './config';
import path from 'path';
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

// 
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

// start server
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
