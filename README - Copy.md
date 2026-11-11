# ZENITH AI

**INTELLIGENCE BEYOND BOUNDARIES.**

ZENITH AI is a responsive AI assistant with an original landing experience, a streaming chat workspace, and a server-side provider adapter. Conversation history and preferences are stored locally in the browser. There is no account synchronization.

## Requirements

- Node.js 20 or newer
- npm
- Ollama for local AI responses without a provider API key (or a key for an OpenAI-compatible provider)

## Install and run

```bash
npm install
npm run dev
```

Open the Vite URL printed in the terminal (normally http://localhost:5173). The Express API runs on http://localhost:3001. The backend health check is at `/api/health`.

For a production frontend build, run `npm run build`. To run the API by itself, run `npm start`; serve the generated `dist/` directory separately and configure its `/api` routing to the backend.

## Configure an AI provider

By default, the backend connects to a locally running Ollama service using `llama3.2:3b`; no API key or `.env` file is needed. Ollama must be running and the model must be installed. To configure it explicitly:

```env
AI_PROVIDER=ollama
AI_BASE_URL=http://127.0.0.1:11434
AI_MODEL=llama3.2:3b
CLIENT_ORIGIN=http://localhost:5173
PORT=3001
```

For an OpenAI-compatible service, use `AI_PROVIDER=openai-compatible`, configure `AI_API_KEY`, and set the service's base URL and model. The API key stays on the server. Restart the backend after changing settings. If Ollama is unavailable, the app reports the problem rather than inventing responses.

## Implemented

- Original responsive landing page and ZENITH star mark
- Conversation create, history, local search, rename, clear, delete, and JSON export
- Markdown, GFM, syntax highlighting, code and message copy
- Streaming responses, stop, retry, regenerate, user message edit, typing state, and actionable errors
- Browser-persisted conversation history, timestamps, theme, and custom instructions
- Express health check, validated chat requests, API rate limiting, configurable CORS, security headers, centralized errors
- Local Ollama streaming integration and optional OpenAI-compatible server-side adapter

## Not yet integrated

File/image attachments and voice input are visibly disabled with an explanation. Authentication, cloud/database persistence, and cross-device synchronization are not implemented.

## Structure

```text
index.html
frontend/src/
  App.jsx
  main.jsx
  components/
  services/api.js
  styles/global.css
  utils/storage.js
backend/
  config/env.js
  middleware/errorHandler.js
  routes/chat.js
  services/aiProvider.js
  server.js
```

## Save and publish

Save changes in VS Code; Git can be used to version the project. For deployment, build with `npm run build`, deploy `dist/` to a static host, and deploy the Express backend to a Node.js host. Configure `AI_API_KEY`, `AI_BASE_URL`, `AI_MODEL`, and `CLIENT_ORIGIN` as server environment variables, and configure the static host to proxy `/api` to the backend. Use HTTPS and a narrowly scoped production `CLIENT_ORIGIN`. Browser-local conversations remain on the device and are not uploaded or synchronized.
