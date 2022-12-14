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
import { registerUser } from 'redux/auth/auth-operations';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

// import { Field, Form, Formik, ErrorMessage } from 'formik';
// import * as Yup from 'yup';

const SignUp = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const onRegisterSubmit = evt => {
    evt.preventDefault();
    dispatch(registerUser({ name: userName, email, password }));
    // setUserName('');
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
        Let`s create new account !
      </Heading>
      <form autoComplete="false" onSubmit={onRegisterSubmit}>
        <FormControl isRequired>
          <FormLabel>User Name</FormLabel>
          <Input
            type="text"
            value={userName}
            onChange={evt => setUserName(evt.target.value)}
          />
          <FormHelperText>For example: Adrian, Jacob Mercer</FormHelperText>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={evt => setEmail(evt.target.value)}
          />
          <FormHelperText>We'll never share your email.</FormHelperText>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={evt => setPassword(evt.target.value)}
          />
          <FormHelperText>
            Password must contains min 7 charecters
          </FormHelperText>
        </FormControl>
        <Box textAlign="center" marginY="5">
          <Button colorScheme="blue" variant="solid" type="submit">
            Register
          </Button>
        </Box>
      </form>
    </Center>
  );
};

export default SignUp;
