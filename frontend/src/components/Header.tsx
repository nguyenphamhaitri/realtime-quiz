import { Flex, Text } from '@chakra-ui/react';
import useAuth from 'hooks/useAuth';
import Login from './Login';
import UserAvatar from './widgets/UserAvatar';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { isLoggedIn, currentUser } = useAuth();
  const navigate = useNavigate();
  const returnToHomePage = () => {
    navigate('/');
  };

  return (
    <Flex
      h="4rem"
      bgColor="#fff"
      alignItems="center"
      px="1rem"
      justifyContent="space-between"
      zIndex={1}
      boxShadow="rgba(0, 0, 0, 0.1) 0px 4px 12px;"
    >
      <Flex className="logo">
        <Text
          fontWeight="bold"
          fontSize="2rem"
          userSelect="none"
          cursor="pointer"
          onClick={returnToHomePage}
        >
          Realtime Quiz
        </Text>
      </Flex>
      {isLoggedIn ? <UserAvatar user={currentUser!} /> : <Login />}
    </Flex>
  );
};
export default Header;
