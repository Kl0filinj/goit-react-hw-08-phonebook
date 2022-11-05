import React from 'react';
import {
  Center,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
} from '@chakra-ui/react';
import { useState } from 'react';

// import { Field, Form, Formik, ErrorMessage } from 'formik';
// import * as Yup from 'yup';

const SignUp = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onRegisterSubmit = evt => {
    evt.preventDefault();
    console.log(
      'userName: ',
      userName,
      'email: ',
      email,
      'password: ',
      password
    );
    setUserName('');
    setEmail('');
    setPassword('');
  };

  return (
    <Center as="main" bg="green.400" h="calc(100vh - 90px)" color="white">
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
          <FormHelperText>We'll never share your password.</FormHelperText>
        </FormControl>

        <Button colorScheme="teal" variant="ghost" type="submit">
          Register
        </Button>
      </form>
    </Center>
  );
};

export default SignUp;
