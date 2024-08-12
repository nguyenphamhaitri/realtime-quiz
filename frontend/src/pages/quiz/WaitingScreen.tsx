import { CopyIcon } from '@chakra-ui/icons';
import { Flex, FlexProps, HStack, Progress, Text } from '@chakra-ui/react';
import CustomButton from 'components/widgets/CustomButton';
import { Quiz } from 'models/quiz';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface WaitingScreenProps extends FlexProps {
  quiz: Quiz;
  isOwner: boolean;
  handleStartQuiz: () => void;
}

const WaitingScreen: React.FC<WaitingScreenProps> = ({
  quiz,
  isOwner,
  handleStartQuiz,
  ...rest
}) => {
  const navigate = useNavigate();
  const returnToHomePage = () => {
    navigate('/');
  };
  return (
    <Flex
      bgColor="#003357"
      alignItems="center"
      justifyContent="center"
      direction="column"
      gap="1rem"
      {...rest}
    >
      <Text fontSize="2.7rem" fontWeight="bold" color="#fff" m="0" p="0">
        Quiz
      </Text>
      <HStack
        cursor="pointer"
        onClick={() => {
          navigator.clipboard.writeText(quiz.quizId || '');
        }}
      >
        <CopyIcon color="#ccc" />
        <Text fontSize="1rem" color="#ccc" m="0" p="0">
          {quiz.quizId}
        </Text>
      </HStack>

      {isOwner && (
        <CustomButton
          bgColor="#fff"
          color="#003357"
          fontSize="1.75rem"
          p="1.5rem"
          _hover={{
            bgColor: '#ccc',
          }}
          onClick={handleStartQuiz}
        >
          Start
        </CustomButton>
      )}
      <CustomButton
        bgColor="#802323"
        color="#fff"
        fontSize="1.75rem"
        p="1.5rem"
        _hover={{
          bgColor: '#ccc',
        }}
        onClick={returnToHomePage}
      >
        Leave
      </CustomButton>
    </Flex>
  );
};

export default WaitingScreen;
