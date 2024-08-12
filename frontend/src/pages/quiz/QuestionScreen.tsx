import {
  Box,
  Flex,
  FlexProps,
  Grid,
  Progress,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Question } from 'models/question';
import React, { useEffect, useRef, useState } from 'react';
import useStateRef from 'react-usestateref';

interface QuestionScreenProps extends FlexProps {
  isStarted: boolean;
  countdownStart: number | undefined;
  setCountdown: (value?: number) => void;
  currentQuestion: Question | undefined;
  answer: string | undefined;
  setAnswer: (value?: string) => void;
  handleSubmitAnswer: (value: string) => void;
}

const QuestionScreen: React.FC<QuestionScreenProps> = ({
  countdownStart,
  isStarted,
  currentQuestion,
  setCountdown,
  answer,
  setAnswer,
  handleSubmitAnswer,
  ...rest
}) => {
  const countdownStartRef = useRef(countdownStart);
  const [countdownQuestion, setCountdownQuestion, countdownQuestionRef] =
    useStateRef<number>();
  const answerRef = useRef(answer);

  useEffect(() => {
    if (!countdownStartRef.current) {
      return;
    }
    const intervalID = setInterval(() => {
      setCountdown(--countdownStartRef.current!);
      if (countdownStartRef.current === 0) {
        window.clearInterval(intervalID);
      }
    }, 1000);

    return () => {
      window.clearInterval(intervalID);
    };
  }, []);

  useEffect(() => {
    if (!currentQuestion?.countdown) {
      return;
    }
    setCountdownQuestion(currentQuestion.countdown - 1);
    const intervalID = setInterval(() => {
      if (countdownQuestionRef.current === 0) {
        if (answerRef.current) {
          handleSubmitAnswer(answerRef.current);
          answerRef.current = undefined;
        }
        window.clearInterval(intervalID);
      } else {
        setCountdownQuestion((prev) => Number(prev) - 1);
      }
    }, 1000);

    return () => {
      window.clearInterval(intervalID);
    };
  }, [currentQuestion?.id]);

  return (
    <Flex
      bgColor="#003357"
      alignItems="center"
      justifyContent="center"
      direction="column"
      gap="1rem"
      color="#fff"
      {...rest}
    >
      {!!countdownStart && (
        <Text fontSize="3rem">{countdownStartRef.current ?? 0}</Text>
      )}
      {!countdownStart && !!currentQuestion && (
        <VStack>
          <Text>{currentQuestion.index + 1}</Text>
          <Text>{currentQuestion.text}</Text>
          <SimpleGrid columns={2} spacing="0.5rem">
            {currentQuestion.options?.map((opt, index) => (
              <Flex
                key={index}
                h="8rem"
                w="20rem"
                alignItems="center"
                justifyContent="center"
                border="1px solid #ccc"
                borderRadius="5px"
                cursor="pointer"
                onClick={() => {
                  setAnswer(opt);
                  answerRef.current = opt;
                }}
                {...(opt === answer
                  ? { bgColor: '#fff', color: '#003357' }
                  : {})}
              >
                {opt}
              </Flex>
            ))}
          </SimpleGrid>
          <Progress
            w="30rem"
            h=".5rem"
            css={{
              backgroundColor: '#ccc',
              '& > div:first-of-type': {
                backgroundColor: '#0af',
              },
            }}
            value={
              (Number(countdownQuestionRef.current) * 100) /
              (Number(currentQuestion?.countdown) - 1)
            }
          />
        </VStack>
      )}
    </Flex>
  );
};

export default QuestionScreen;
