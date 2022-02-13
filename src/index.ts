import express from 'express';
import routes from './routes.js';
import fileSystem from './fileSystem.js';

const app = express();
const port = 3000;
app.use(routes);

app.listen(port, async () => {
  await fileSystem.getThumbPath();
  console.log(`server started at localhost:${port}`);
});

export default app;