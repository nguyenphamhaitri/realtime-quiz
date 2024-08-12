import { Flex, Stack, StackDivider, Text } from '@chakra-ui/react';
import useAuth from 'hooks/useAuth';
import InputQuiz from './InputQuiz';
import CreateQuiz from './CreateQuiz';
import InputName from '../../components/InputName';

export default function HomePage() {
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
      {isLoggedIn ? (
        <Stack
          direction="row"
          divider={<StackDivider borderLeft="1px solid #fff" />}
          spacing="6rem"
          alignItems="center"
        >
          <InputQuiz w="20rem" /> <CreateQuiz w="20rem" />
        </Stack>
      ) : (
        <InputName />
      )}
    </Flex>
  );
}
