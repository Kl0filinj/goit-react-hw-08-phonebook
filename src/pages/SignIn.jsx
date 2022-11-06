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
    console.log('email: ', email, 'password: ', password);
    setEmail('');
    setPassword('');
  };

  return (
    <Center as="main" bg="blue.800" maxW="full" color="white">
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

        <Button colorScheme="teal" variant="ghost" type="submit">
          Enter
        </Button>
      </form>
    </Center>
  );
};

export default SignIn;
