import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname faux for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());

// sample API endpoint
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// serve the frontend build
const clientBuildPath = path.join(__dirname, '../..', 'dist');
app.use(express.static(clientBuildPath));

// fallback to index.html for client-side routing
app.get('*', (_req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend listening on port ${PORT}`);
});
