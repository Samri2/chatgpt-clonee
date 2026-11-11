import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chatRoutes from './src/api/chat/chatRoutes.js';
import { notFound, errorHandler } from './src/middleware/errorHandler.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3777;

app.use(cors());
app.use(express.json());

// Base health check
app.get('/', (req, res) => res.send('ChatGPT clone API is running'));
// Mount chat routes
app.use('/api/chat', chatRoutes);


// Error middleware (must be registered last!)
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
