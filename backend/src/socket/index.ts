import { Server } from 'socket.io';
import http from 'http';
import {
  handleDisconnected,
  handleJoinSession,
  handleLeaveSession,
  handleStartQuiz,
  handleSubmitAnswer,
} from './session';

const io: Server | undefined = undefined;

export const connectSocket = (server: http.Server) => {
  const io = new Server(server);
  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('joinSession', ({ sessionId, username }, callback) => {
      handleJoinSession(
        io,
        { sessionId, username, socketId: socket.id },
        callback,
      );
    });

    socket.on('leaveSession', ({ sessionId, username }) => {
      handleLeaveSession(io, { sessionId, username });
    });

    socket.on('startQuiz', (sessionId, callback) => {
      handleStartQuiz(io, sessionId, callback);
    });

    socket.on(
      'submitAnswer',
      ({ sessionId, username, answer, questionIndex }, callback) => {
        handleSubmitAnswer(
          io,
          { sessionId, username, answer, questionIndex },
          callback,
        );
      },
    );

    socket.on('disconnect', () => {
      handleDisconnected(io, socket.id);
      console.log('Client disconnected');
    });
  });
};
