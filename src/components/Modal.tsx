import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Box,
} from '@chakra-ui/react';
import { updateContact } from 'redux/contacts/contacts-operations';
import { EditIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { useAppDispatch } from 'redux/hooks';
import { INewContact } from 'types/contactsTypes';
import { InputEventType, SubmitFormEventType } from 'types/commonTypes';

interface ChangeModalProps {
  contactId: string;
  userData: INewContact;
}

const ChangeModal: React.FC<ChangeModalProps> = ({ contactId, userData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newName, setNewName] = useState(() => userData.name);
  const [newNumber, setNewNumber] = useState(() => userData.number);

  const dispatch = useAppDispatch();

  const handleConatctChange = (evt: SubmitFormEventType) => {
    evt.preventDefault();
    dispatch(
      updateContact({ name: newName, number: newNumber, id: contactId })
    );
    onClose();
  };

  return (
    <>
      <Button variant="outline" ml="1.5" onClick={onOpen}>
        <EditIcon />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form autoComplete="false" onSubmit={handleConatctChange}>
              <FormControl isRequired>
                <FormLabel>New Number</FormLabel>
                <Input
                  type="tel"
                  value={newNumber}
                  pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                  title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                  onChange={(evt: InputEventType) =>
                    setNewNumber(evt.target.value)
                  }
                />
                <FormHelperText>For example: +380 95 122 0366</FormHelperText>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>New Name</FormLabel>
                <Input
                  type="text"
                  value={newName}
                  pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                  title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer"
                  onChange={(evt: InputEventType) =>
                    setNewName(evt.target.value)
                  }
                />
                <FormHelperText>For example: Amalia Rorshekh</FormHelperText>
              </FormControl>

              <Box textAlign="center" marginY="5">
                <Button colorScheme="blue" variant="solid" type="submit">
                  Change Contact
                </Button>
              </Box>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ChangeModal;
