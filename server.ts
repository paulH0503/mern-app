import express, { Application } from 'express';
import root from './src/root';
import { env } from './src/config';
import path from 'path';
// app
const app: Application = express();

app.use(express.static(__dirname + '/client/build'));
app.get('*', (req, res) => {
  console.log(__dirname + '/client/build', "__dirname");
  const root = path.join(__dirname, 'client', 'build');
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
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
