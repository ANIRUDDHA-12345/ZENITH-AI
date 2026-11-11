import 'dotenv/config';

const port = Number.parseInt(process.env.PORT ?? '3001', 10);

export const config = {
  port: Number.isInteger(port) && port > 0 ? port : 3001,
  clientOrigin: process.env.CLIENT_ORIGIN ?? 'http://localhost:5173',
  provider: process.env.AI_PROVIDER ?? 'ollama',
  apiKey: process.env.AI_API_KEY ?? '',
  baseUrl: (process.env.AI_BASE_URL ?? 'http://127.0.0.1:11434').replace(/\/+$/, ''),
  model: process.env.AI_MODEL ?? 'llama3.2:3b',
};
