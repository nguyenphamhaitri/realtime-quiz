import {
  Avatar,
  Box,
  Flex,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  StackDivider,
  Text,
  VStack,
} from '@chakra-ui/react';
import useAuth from 'hooks/useAuth';
import { User } from 'models/user';
import React from 'react';

const UserAvatar: React.FC<{ user: User }> = ({ user }: { user: User }) => {
  const { handleLogout } = useAuth();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Popover closeOnBlur>
        <PopoverTrigger>
          <Flex direction="column" alignItems="center">
            <Avatar
              w="1.25rem"
              h="1.25rem"
              p="0.5rem"
              m="0"
              bgColor="#003357"
              borderRadius="50%"
              color="#fff"
              name={user.username}
              cursor="pointer"
            />
            <Text m="0" fontSize=".75rem" cursor="pointer">
              {user.username}
            </Text>
          </Flex>
        </PopoverTrigger>
        <PopoverContent width="150px">
          <PopoverBody
            bgColor="#fff"
            border="1px solid #ccc"
            borderRadius="5px"
            userSelect="none"
            overflow="hidden"
          >
            <VStack
              alignItems="flex-start"
              spacing="0"
              divider={<StackDivider w="100%" borderTop="1px solid #ccc" />}
            >
              <Box
                h="1rem"
                w="100%"
                p="0.5rem"
                m="0"
                cursor="pointer"
                _hover={{ bgColor: '#ccc' }}
              >
                <Text m="0">Profile</Text>
              </Box>

              <Box
                h="1rem"
                w="100%"
                m="0"
                cursor="pointer"
                p="0.5rem"
                _hover={{ bgColor: '#ccc' }}
                onClick={handleLogout}
              >
                <Text m="0">Logout</Text>
              </Box>
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};

export default UserAvatar;
