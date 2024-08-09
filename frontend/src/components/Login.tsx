import { Box, Stack } from '@chakra-ui/react';
import { useDispatch } from 'hooks';
import React, { useState } from 'react';
import { login } from 'store/slices/userSlice';
import CustomButton from './widgets/CustomButton';
import CustomInput from './widgets/CustomInput';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ username, password }));
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
