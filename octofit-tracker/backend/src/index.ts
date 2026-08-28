import express from 'express';
import { connectDatabase } from './config/database.js';
import { router } from './routes.js';

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(express.json());

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL || '*');
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Methods', 'GET,POST,PATCH,OPTIONS');
  if (request.method === 'OPTIONS') {
    response.sendStatus(204);
    return;
  }
  next();
});

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.use('/api', router);

const server = app.listen(port, () => {
  console.log(`OctoFit API listening on port ${port}`);
});

connectDatabase().catch((error) => {
  console.error('Error connecting to octofit_db:', error);
  server.close();
  process.exitCode = 1;
});
