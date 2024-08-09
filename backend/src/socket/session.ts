import { QuestionDto } from 'dtos/question';
import { questionService } from 'services/question.service';
import { Server } from 'socket.io';
import { generateSessionId } from 'utils/common';

interface Participant {
  username: string;
  socketId: string;
}

export interface Session {
  sessionId: string;
  name?: string;
  questions: QuestionDto[];
  questionIndex: number;
  participants: Participant[];
  scoreBoard: { [username: string]: number };
  intervalId?: any;
}
export const sessions: { [sessionId: string]: Session } = {};

export const handleCreateSession = async (name?: string) => {
  const session: Session = {
    sessionId: generateSessionId(),
    name,
    questions: await questionService.getRandomQuestions(10),
    questionIndex: -1,
    participants: [],
    scoreBoard: {},
  };

  sessions[session.sessionId] = session;

  return session.sessionId;
};

export const handleJoinSession = (
  io: Server,
  {
    sessionId,
    username,
    socketId,
  }: { sessionId: string; username: string; socketId: string },
  callback: any,
) => {
  const session = sessions[sessionId];
  if (!session) {
    return callback({ success: false, error: 'session not found.' });
  }
  if (session.questionIndex != -1) {
    return callback({ success: false, error: 'session started.' });
  }
  if (Object.keys(session.participants).length >= 30) {
    return callback({ success: false, error: 'session is full.' });
  }

  session.participants.push({ username, socketId });
  session.scoreBoard[username] = 0;

  sessions[sessionId] = session;

  io.to(sessionId).emit('updateParticipant', session.participants);
  return callback({ success: true, message: `joined session ${sessionId}` });
};

export const handleLeaveSession = (
  io: Server,
  { sessionId, username }: { sessionId: string; username: string },
) => {
  const session = sessions[sessionId];
  if (!session) {
    return;
  }
  session.participants = session.participants.filter(
    ({ username: name }) => name !== username,
  );

  if (session.participants.length <= 0) {
    delete sessions[sessionId];
    return;
  }

  io.to(sessionId).emit('updateParticipant', session.participants);
};

export const handleStartQuiz = (
  io: Server,
  sessionId: string,
  callback: any,
) => {
  const session = sessions[sessionId];
  if (!session) {
    return;
  }
  if (session.participants.length < 2) {
    return callback({ error: 'not enough participants.' });
  }
  io.to(sessionId).emit('quizStarting', { countdown: 3 });

  const handleUpdateQuestion = () => {
    if (session.questionIndex < session.questions.length) {
      const question = session.questions[++session.questionIndex];
      io.to(sessionId).emit('newQuestion', question);
    } else {
      clearInterval(session.intervalId);
      io.to(sessionId).emit('quizEnded');
    }
  };
  setTimeout(() => {
    handleUpdateQuestion();
    session.intervalId = setInterval(() => handleUpdateQuestion, 5000);
  }, 3000);

  return callback({ success: true });
};

export const handleSubmitAnswer = (
  io: Server,
  {
    answer,
    questionIndex,
    sessionId,
    username,
  }: {
    sessionId: string;
    username: string;
    questionIndex: number;
    answer: string;
  },
  callback: any,
) => {
  const session = sessions[sessionId];
  if (!session) {
    return;
  }
  if (
    !session.participants.find(
      (participant) => participant.username === username,
    )
  ) {
    return callback({ success: false, error: 'forbid access.' });
  }
  if (session.questionIndex !== questionIndex) {
    return callback({ success: false, error: 'invalid question submit.' });
  }
  const currentQuestion = session.questions[session.questionIndex];
  const isCorrect = currentQuestion.answer === answer;
  if (isCorrect) {
    session.scoreBoard[username]++;
  }

  io.to(sessionId).emit('updateScoreBoard', session.scoreBoard);
  return callback({ success: true, isCorrect });
};

export const handleDisconnected = (io: Server, socketId: string) => {
  Object.values(sessions).forEach((session) => {
    var user = session.participants.find(
      (participant) => participant.socketId === socketId,
    );
    if (!!user) {
      handleLeaveSession(io, {
        sessionId: session.sessionId,
        username: user.username,
      });
    }
  });
};
