import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { config } from './config/env.js';
import chatRouter from './routes/chat.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

const app = express();

app.disable('x-powered-by');
app.use(helmet());
app.use(cors({ origin: config.clientOrigin }));
app.use(express.json({ limit: '128kb' }));
app.use('/api', rateLimit({
  windowMs: 60_000,
  limit: 30,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { error: { code: 'RATE_LIMITED', message: 'Too many requests. Please wait a minute and try again.' } },
}));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', aiConfigured: config.provider === 'ollama' || Boolean(config.apiKey), provider: config.provider, model: config.model });
});
app.use('/api/chat', chatRouter);
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`[server] ZENITH AI API listening on http://localhost:${config.port}`);
});
