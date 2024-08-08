// src/components/Login.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react';
import { UserApi } from 'apis/userApi';
import CustomInput from './ui/CustomInput';
import CustomButton from './ui/CustomButton';

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
    <Box>
      <form onSubmit={handleSubmit}>
        <Stack direction="row" spacing="1rem" alignItems="center">
          <CustomInput
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <CustomInput
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <CustomButton type="submit">Login</CustomButton>
        </Stack>
      </form>
    </Box>
  );
};

export default Login;
