import { Box, Flex, Text } from '@chakra-ui/react';
import InputName from './InputName';
import useAuth from 'hooks/useAuth';
import InputQuiz from './InputQuiz';

export default function Home() {
  const { isLoggedIn } = useAuth();

  return (
    <Flex
      className="animated-background"
      w="100vw"
      flexGrow={4}
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      <Text
        className="animated-text"
        fontSize="2.7rem"
        fontWeight="bold"
        color="#fff"
      >
        Welcome to Real-Time Vocabulary Quiz Coding Challenge
      </Text>
      {isLoggedIn ? <InputQuiz /> : <InputName />}
    </Flex>
  );
}
