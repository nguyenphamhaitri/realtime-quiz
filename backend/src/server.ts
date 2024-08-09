import express, { NextFunction, Request, Response } from 'express';
import http from 'http';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import connectDB from './config/db';
import questionRoutes from './routes/question.router';
import userRoutes from './routes/user.router';
import cors from 'cors';
import { connectSocket } from './socket';

dotenv.config();

const app = express();
const server = http.createServer(app);

// Connect to MongoDB
connectDB();

// Connect web socket
connectSocket(server);

// Middleware
app.use(express.json());
app.use(cors());

// Log
app.use((req, res, next) => {
  var method = req.method;
  switch (method) {
    case 'POST':
    case 'PUT':
      console.log(`${req.method} ${req.url} ${JSON.stringify(req.body)}`);
      break;
    case 'GET':
    case 'DELETE':
      console.log(`${req.method} ${req.url} ${JSON.stringify(req.query)}`);
      break;
    default:
      break;
  }

  next();
});

// Routes
app.use('/api/v1/questions', questionRoutes);
app.use('/api/v1/users', userRoutes);

// Custom error handling
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    var msg = { error: err.array ? err.array()[0].msg : err.message };
    return res.status(400).json(msg);
  }
  return res.status(500).json({ message: 'Internal Server Error' });
});

app.use((req, res, next) => {
  res.status(404).json({ error: 'path not found.' });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
