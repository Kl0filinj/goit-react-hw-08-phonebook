import AddContactSection from 'components/AddContactSection';
import ContactListSection from 'components/ContactListSection';
import { Container, Heading } from '@chakra-ui/react';
import { fetchAllContacts } from 'redux/contacts/contacts-operations';
import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import { useAppDispatch } from 'redux/hooks';

const Contacts: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllContacts());
  }, [dispatch]);

  return (
    <Container as="main" bg="blue.800" maxW="full" color="white">
      <Heading
        textAlign="center"
        pt="7"
        pb="20"
        fontFamily="heading"
        fontWeight="medium"
      >
        Let`s create new contacts together !
      </Heading>
      <Container
        maxW="container.xl"
        display="flex"
        justifyContent="space-between"
      >
        <AddContactSection />
        <ContactListSection />
      </Container>
    </Container>
  );
};

export default Contacts;
