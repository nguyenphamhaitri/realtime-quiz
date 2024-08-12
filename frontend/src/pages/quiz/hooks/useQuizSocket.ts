import { useToast } from '@chakra-ui/react';
import { toast } from 'index';
import { Question } from 'models/question';
import { Quiz } from 'models/quiz';
import { User } from 'models/user';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';

interface QuizHookProps {
  quizId: string | undefined;
  isLoggedIn: boolean;
  currentUser: User | undefined;
}

export function useQuizHook({
  quizId,
  currentUser,
  isLoggedIn,
}: QuizHookProps) {
  const navigate = useNavigate();
  const socketRef = useRef<Socket>();
  const [quiz, setQuiz] = useState<Quiz>();
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>();
  const [currentQuestion, setCurrentQuestion] = useState<Question>();
  const [answer, setAnswer] = useState<string>();

  const isOwner = useMemo(() => {
    return !!currentUser && !!quiz && currentUser.username === quiz.createUser;
  }, [currentUser, quiz]);

  const handleJoinQuiz = (socket: Socket, quizId: string, username: string) => {
    socket.emit(
      'joinQuiz',
      { quizId, username },
      (response: { success: boolean; quiz?: Quiz; error?: string }) => {
        if (response.success) {
          setQuiz(response.quiz);
          console.log(response.quiz);
        } else {
          alert(response.error);
          navigate('/');
        }
      },
    );
  };

  const handleOnUpdateParticipants = (
    participants: string[],
    scoreBoard: any,
  ) => {
    setQuiz((prev) => {
      return { ...prev!, participants, scoreBoard };
    });
  };

  const handleStartQuiz = () => {
    if (!isOwner || !socketRef.current) {
      return;
    }

    socketRef.current.emit(
      'startQuiz',
      { quizId },
      (response: { success: boolean; error?: string }) => {
        if (!response.success) {
          alert(response.error);
        }
      },
    );
  };

  const handleOnStartQuiz = (countdown: number) => {
    setIsStarted(true);
    setAnswer(undefined);
    setCountdown(countdown);
  };

  const handleSubmitAnswer = useCallback(
    (answer: string) => {
      if (!currentUser || !socketRef.current || !currentQuestion || !answer) {
        return;
      }
      socketRef.current?.emit(
        'submitAnswer',
        {
          quizId,
          username: currentUser.username,
          questionIndex: currentQuestion.index,
          answer: answer,
        },
        (response: {
          success: boolean;
          error?: string;
          isCorrect: boolean;
        }) => {
          if (!response.success) {
            alert(response.error);
          }
          toast({
            status: response.isCorrect ? 'success' : 'error',
            duration: 1000,
          });
        },
      );
    },
    [currentQuestion?.id],
  );

  const handleOnUpdateScoreBoard = (scoreBoard: any) => {
    setQuiz((prev) => {
      return { ...prev!, scoreBoard };
    });
  };

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    socketRef.current = io(process.env.REACT_APP_SOCKET_URL!);
    socketRef.current.on('connect', () => {
      handleJoinQuiz(socketRef.current!, quizId || '', currentUser.username);
    });

    socketRef.current.on(
      'updateParticipant',
      ({ participants, scoreBoard }) => {
        handleOnUpdateParticipants(participants, scoreBoard);
      },
    );

    socketRef.current.on('updateScoreBoard', ({ scoreBoard }) => {
      handleOnUpdateScoreBoard(scoreBoard);
    });

    socketRef.current.on(
      'startQuiz',
      ({ countdown }: { countdown: number }) => {
        handleOnStartQuiz(countdown);
      },
    );
    socketRef.current.on('quizEnded', () => {
      setIsStarted(false);
    });

    socketRef.current.on('newQuestion', (question) => {
      setCurrentQuestion(question);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [isLoggedIn]);

  return {
    quiz,
    isOwner,
    isStarted,
    countdown,
    currentQuestion,
    answer,
    setAnswer,
    setCountdown,
    handleStartQuiz,
    handleSubmitAnswer,
  };
}
