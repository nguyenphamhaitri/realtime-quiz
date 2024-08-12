import { QuestionDto } from 'dtos/question';
import { questionService } from 'services/question.service';
import { Server } from 'socket.io';
import { generateQuizId } from 'utils/common';

interface Participant {
  username: string;
  socketId: string;
}

export interface Quiz {
  quizId: string;
  name?: string;
  questions: QuestionDto[];
  questionIndex: number;
  participants: Participant[];
  scoreBoard: { [username: string]: number };
  createUser: string;
  intervalId?: any;
}
export const quizzes: { [quizId: string]: Quiz } = {};

export const handleCreateQuiz = async (createUser: string, name?: string) => {
  const quiz: Quiz = {
    quizId: generateQuizId(),
    name,
    questions: await questionService.getRandomQuestions(5),
    questionIndex: -1,
    participants: [],
    scoreBoard: {},
    createUser: createUser,
  };

  quizzes[quiz.quizId] = quiz;

  return quiz.quizId;
};

export const handleJoinQuiz = (
  io: Server,
  {
    quizId,
    username,
    socketId,
  }: { quizId: string; username: string; socketId: string },
  callback: any,
) => {
  const quiz = quizzes[quizId];
  if (!quiz) {
    return callback({ success: false, error: 'quiz not found.' });
  }
  if (quiz.questionIndex != -1) {
    return callback({ success: false, error: 'quiz started.' });
  }
  if (Object.keys(quiz.participants).length >= 30) {
    return callback({ success: false, error: 'quiz is full.' });
  }

  quiz.participants.push({ username, socketId });
  quiz.scoreBoard[username] = 0;

  quizzes[quizId] = quiz;

  io.to(quizId).emit('updateParticipant', {
    participants: quiz.participants.map((participant) => participant.username),
    scoreBoard: quiz.scoreBoard,
  });
  return callback({
    success: true,
    quiz: {
      quizId: quiz.quizId,
      name: quiz.name,
      participants: quiz.participants.map(
        (participant) => participant.username,
      ),
      scoreBoard: quiz.scoreBoard,
      createUser: quiz.createUser,
    },
  });
};

export const handleLeaveQuiz = (
  io: Server,
  { quizId, username }: { quizId: string; username: string },
) => {
  const quiz = quizzes[quizId];
  if (!quiz) {
    return;
  }
  quiz.participants = quiz.participants.filter(
    ({ username: name }) => name !== username,
  );
  if (quiz.questionIndex === -1) {
    delete quiz.scoreBoard[username];
  }

  // clear quiz session after 30s
  setTimeout(() => {
    if (!!quizzes[quizId] && quizzes[quizId].participants.length <= 0) {
      delete quizzes[quizId];
      return;
    }
  }, 30000);

  io.to(quizId).emit('updateParticipant', {
    participants: quiz.participants.map((participant) => participant.username),
    scoreBoard: quiz.scoreBoard,
  });
};

export const handleStartQuiz = (io: Server, quizId: string, callback: any) => {
  const quiz = quizzes[quizId];
  if (!quiz) {
    return;
  }
  if (quiz.participants.length < 2) {
    return callback({ success: false, error: 'not enough participants.' });
  }
  quiz.questionIndex = -1;
  Object.keys(quiz.scoreBoard).forEach((key) => (quiz.scoreBoard[key] = 0));
  io.to(quizId).emit('startQuiz', {
    countdown: 5,
  });
  io.to(quizId).emit('updateScoreBoard', { scoreBoard: quiz.scoreBoard });

  const handleUpdateQuestion = () => {
    if (quiz.questionIndex < quiz.questions.length - 1) {
      const question = quiz.questions[++quiz.questionIndex];
      io.to(quizId).emit('newQuestion', {
        ...question,
        answer: '',
        index: quiz.questionIndex,
        countdown: 5,
      });
    } else {
      clearInterval(quiz.intervalId);
      io.to(quizId).emit('quizEnded');
    }
  };
  quiz.intervalId = setInterval(handleUpdateQuestion, 5050);

  return callback({ success: true });
};

export const handleSubmitAnswer = (
  io: Server,
  {
    answer,
    questionIndex,
    quizId,
    username,
  }: {
    quizId: string;
    username: string;
    questionIndex: number;
    answer: string;
  },
  callback: any,
) => {
  console.log(answer, questionIndex, quizId, username);
  const quiz = quizzes[quizId];
  if (!quiz) {
    return;
  }
  if (
    !quiz.participants.find((participant) => participant.username === username)
  ) {
    return callback({ success: false, error: 'forbid access.' });
  }
  if (quiz.questionIndex !== questionIndex) {
    return callback({ success: false, error: 'invalid question submit.' });
  }
  const currentQuestion = quiz.questions[quiz.questionIndex];
  if (!currentQuestion) {
    return;
  }
  const isCorrect = currentQuestion.answer === answer;
  if (isCorrect) {
    quiz.scoreBoard[username]++;
  }

  io.to(quizId).emit('updateScoreBoard', { scoreBoard: quiz.scoreBoard });
  return callback({ success: true, isCorrect });
};

export const handleDisconnected = (io: Server, socketId: string) => {
  Object.values(quizzes).forEach((quiz) => {
    const user = quiz.participants.find(
      (participant) => participant.socketId === socketId,
    );
    if (!!user) {
      handleLeaveQuiz(io, {
        quizId: quiz.quizId,
        username: user.username,
      });
    }
  });
};
