import { Box, Flex, Text } from '@chakra-ui/react';
import Login from './Login';

const Header = () => {
  return (
    <Flex
      h="4rem"
      bgColor="#fff"
      alignItems="center"
      px="1rem"
      justifyContent="space-between"
    >
      <Flex className="logo">
        <Text fontWeight="bold" fontSize="2rem">
          Realtime Quiz
        </Text>
      </Flex>
      <Login />
    </Flex>
  );
};

export default Header;
