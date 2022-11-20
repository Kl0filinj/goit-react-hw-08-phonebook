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
import { useDispatch } from 'react-redux';

// import { Field, Form, Formik, ErrorMessage } from 'formik';
// import * as Yup from 'yup';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const onLogInSubmit = evt => {
    evt.preventDefault();
    dispatch(logInUser({ email, password }));
    // setEmail('');
    // setPassword('');
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
            onChange={evt => setEmail(evt.target.value)}
          />
          <FormHelperText>For example: sadadada@mail.com</FormHelperText>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={evt => setPassword(evt.target.value)}
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
