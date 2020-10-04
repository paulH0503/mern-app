import express, { Application } from 'express';
import root from './src/root';
import { env } from './src/config';
import path from 'path';
// app
const app: Application = express();

let pathClient = __dirname + '/client/build';
if (process.env.NODE_ENV === 'production') {
  // build prod into dist so need to out 1 level directory
  pathClient = __dirname + '/../client/build';
}
app.use(express.static(pathClient));
app.get('*', (req, res) => {
  console.log(pathClient, "__dirname");
  res.sendFile(path.resolve(pathClient, 'index.html'));
})
// init
root(app)
  .initDB()
  .initMiddleware()
  .initThirdParty()
  .initRouter()

// config
const PORT = env.PORT || 5000;

// 
// if (process.env.NODE_ENV === 'development') {
// }

// start server
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
