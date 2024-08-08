import { Box, Flex, Text } from '@chakra-ui/react';

export default function Home() {
  return (
    <Flex
      className="animated-background"
      w="100vw"
      flexGrow={4}
      alignItems="center"
      justifyContent="center"
    >
      <Text
        className="animated-text"
        fontSize="3rem"
        fontWeight="bold"
        color="#fff"
      >
        Real-Time Vocabulary Quiz Coding Challenge
      </Text>
    </Flex>
  );
}
