import React from 'react';
import {
  Center,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
  Heading,
  Box,
} from '@chakra-ui/react';
import { useState } from 'react';
import { logInUser } from 'redux/auth/auth-operations';
import { useAppDispatch } from 'redux/hooks';
import { InputEventType, SubmitFormEventType } from 'types/commonTypes';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();

  const onLogInSubmit = (evt: SubmitFormEventType) => {
    evt.preventDefault();
    dispatch(logInUser({ email, password }));
  };

  return (
    <Center
      as="main"
      bg="blue.800"
      color="white"
      py="16"
      display="flex"
      flexDirection="column"
    >
      <Heading as="h1" mb="6">
        You can enter here
      </Heading>
      <form autoComplete="false" onSubmit={onLogInSubmit}>
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(evt: InputEventType) => setEmail(evt.target.value)}
          />
          <FormHelperText>For example: sadadada@mail.com</FormHelperText>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(evt: InputEventType) => setPassword(evt.target.value)}
          />
          <FormHelperText>We'll never share your password.</FormHelperText>
        </FormControl>

        <Box textAlign="center" marginY="5">
          <Button colorScheme="blue" variant="solid" type="submit">
            Enter
          </Button>
        </Box>
      </form>
    </Center>
  );
};

export default SignIn;
