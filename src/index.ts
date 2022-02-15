import express from 'express';
import routes from './routes';
import fileSystem from './fileSystem';

const app = express();
const port = 3000;
app.use(routes);

app.listen(port, async (): Promise<void> => {
  await fileSystem.getThumbPath();
  console.log(`server started at localhost:${port}`);
});

export default app;