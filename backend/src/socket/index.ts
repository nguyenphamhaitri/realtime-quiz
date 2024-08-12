import { Server } from 'socket.io';
import http from 'http';
import {
  handleDisconnected,
  handleJoinQuiz,
  handleLeaveQuiz,
  handleStartQuiz,
  handleSubmitAnswer,
} from './quiz';

let io: Server | undefined = undefined;

export const connectSocket = (server: http.Server) => {
  io = new Server(server, {
    cors: {
      origin: '*',
    },
  });
  io.on('connection', (socket) => {
    console.log('New client connected ', socket.id);

    socket.on('joinQuiz', ({ quizId, username }, callback) => {
      socket.join(quizId);
      handleJoinQuiz(io!, { quizId, username, socketId: socket.id }, callback);
    });

    socket.on('leaveQuiz', ({ quizId, username }) => {
      handleLeaveQuiz(io!, { quizId, username });
    });

    socket.on('startQuiz', ({ quizId }, callback) => {
      handleStartQuiz(io!, quizId, callback);
    });

    socket.on(
      'submitAnswer',
      ({ quizId, username, answer, questionIndex }, callback) => {
        handleSubmitAnswer(
          io!,
          { quizId, username, answer, questionIndex },
          callback,
        );
      },
    );

    socket.on('disconnect', () => {
      handleDisconnected(io!, socket.id);
      console.log('Client disconnected');
    });
  });
};
