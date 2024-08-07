import { Server } from 'socket.io';
import http from 'http';

const io: Server | undefined = undefined;

export const connectSocket = (server: http.Server) => {
  const io = new Server(server);
  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('joinQuiz', (quizId: string, username: string) => {
      // Handle user joining quiz logic
    });

    socket.on('submitAnswer', (data: { username: string; answer: string }) => {
      // Handle answer submission and score update logic
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};
