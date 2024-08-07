// src/components/Login.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { UserApi } from 'apis/userApi';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(username + '-' + password);
    console.log(await UserApi.login(username, password));
  };

  return (
    <Box maxW="md" mx="auto" mt="8">
      <form onSubmit={handleSubmit}>
        <FormControl id="email" mb="4">
          <FormLabel>Username</FormLabel>
          <Input
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
          />
        </FormControl>
        <FormControl id="password" mb="4">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </FormControl>
        <Button type="submit" colorScheme="teal">
          Login
        </Button>
      </form>
    </Box>
  );
};

export default Login;
