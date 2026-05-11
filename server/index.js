import './config/loadEnv.js';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { userRoute } from './routes/userRoute.js';
import { projectRoute } from './routes/projectRoute.js';
import { contentRoute } from './routes/contentRoute.js';
import { prisma } from './config/prismaConfig.js';

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/api/user', userRoute);
app.use('/api/projects', projectRoute);
app.use('/api/content', contentRoute);

app.get('/api/health', async (req, res) => {
  try {
    if (!process.env.DATABASE_URL) {
      return res
        .status(503)
        .json({ ok: false, reason: 'DATABASE_URL is not set on the server' });
    }
    await prisma.$connect();
    res.json({ ok: true, database: 'reachable' });
  } catch (err) {
    console.error(err);
    res.status(503).json({
      ok: false,
      reason: err.message || 'Database connection failed',
    });
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  const status = res.statusCode >= 400 ? res.statusCode : 500;
  res.status(status).json({ message: err.message || 'Server error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
