import { Flex } from '@chakra-ui/react';
import InputName from 'components/InputName';
import useAuth from 'hooks/useAuth';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuizHook } from './hooks/useQuizSocket';
import ParticipantBar from './ParticipantBar';
import QuestionScreen from './QuestionScreen';
import ScoreBar from './ScoreBar';
import WaitingScreen from './WaitingScreen';

export default function QuizPage() {
  const { quizId } = useParams();
  const { currentUser, isLoggedIn } = useAuth();
  const {
    quiz,
    isOwner,
    isStarted,
    countdown,
    currentQuestion,
    answer,
    setAnswer,
    handleStartQuiz,
    setCountdown,
    handleSubmitAnswer,
  } = useQuizHook({
    quizId,
    currentUser,
    isLoggedIn,
  });

  return (
    <Flex w="100vw" h="100vh">
      {isLoggedIn && !!quiz && (
        <React.Fragment>
          <ScoreBar scoreBoard={quiz.scoreBoard} flexGrow={1} />
          {isStarted ? (
            <QuestionScreen
              countdownStart={countdown}
              isStarted={isStarted}
              setCountdown={setCountdown}
              currentQuestion={currentQuestion}
              answer={answer}
              setAnswer={setAnswer}
              handleSubmitAnswer={handleSubmitAnswer}
              flexGrow={7}
            />
          ) : (
            <WaitingScreen
              quiz={quiz}
              isOwner={isOwner}
              handleStartQuiz={handleStartQuiz}
              flexGrow={7}
            />
          )}
        </React.Fragment>
      )}

      {!isLoggedIn && (
        <Flex
          w="100vw"
          bgColor="#003357"
          flexGrow={4}
          alignItems="center"
          justifyContent="center"
          direction="column"
          gap="1rem"
        >
          <InputName />
        </Flex>
      )}
    </Flex>
  );
}
