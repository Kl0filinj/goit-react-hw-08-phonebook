import React from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
} from '@chakra-ui/react';
import { addContact } from 'redux/contacts/contacts-operations';
import { useState } from 'react';
import { useAppDispatch } from 'redux/hooks';
import { InputEventType, SubmitFormEventType } from 'types/commonTypes';
// import { useDispatch } from 'react-redux';

const AddContactSection: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');

  const dispatch = useAppDispatch();

  const addContactHandler = (evt: SubmitFormEventType) => {
    evt.preventDefault();
    dispatch(addContact({ name, number: phone }));
    setPhone('');
    setName('');
  };
  return (
    <Box flexGrow="1" display="flex" justifyContent="center">
      <Box
        w="md"
        h="fit-content"
        borderRadius="lg"
        bg="gray.700"
        paddingY="5"
        paddingX="7"
      >
        <Heading
          as="h2"
          mb="6"
          textAlign="center"
          fontFamily="heading"
          fontWeight="medium"
        >
          Add new contact
        </Heading>
        <form autoComplete="false" onSubmit={addContactHandler}>
          <FormControl isRequired>
            <FormLabel>Number</FormLabel>
            <Input
              type="tel"
              value={phone}
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              onChange={(evt: InputEventType) => setPhone(evt.target.value)}
            />
            <FormHelperText>For example: +380 95 122 0366</FormHelperText>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              value={name}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer"
              onChange={(evt: InputEventType) => setName(evt.target.value)}
            />
            <FormHelperText>For example: Amalia Rorshekh</FormHelperText>
          </FormControl>

          <Box textAlign="center" marginY="5">
            <Button colorScheme="blue" variant="solid" type="submit">
              Add Contatc
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default AddContactSection;
