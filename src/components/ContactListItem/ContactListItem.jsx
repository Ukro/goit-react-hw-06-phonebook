import { useDispatch } from 'react-redux';

import PropTypes from 'prop-types';

import { HiOutlineUserCircle, HiOutlinePhone } from 'react-icons/hi';
import { FaRegTrashAlt } from 'react-icons/fa';

import {
  Contact,
  ContactName,
  ContactNumber,
  Container,
} from './ContactListItem.styled';

import { deleteContact } from 'redux/contactsSlice';
import IconButton from 'components/IconButton';

export default function ContactListItem({ contact: { id, name, number } }) {
  const dispatch = useDispatch();

  return (
    <Contact>
      <>
        <Container>
          <HiOutlineUserCircle size={20} color="#400080" />
          <ContactName>{name}</ContactName>
        </Container>
        <Container>
          <HiOutlinePhone size={20} color="#400080" />
          <ContactNumber>{number}</ContactNumber>
        </Container>
      </>

      <IconButton
        type="button"
        aria-label="For delete contact"
        onClick={() => dispatch(deleteContact({ id, name }))}
      >
        <FaRegTrashAlt />
      </IconButton>
    </Contact>
  );
}

ContactListItem.propTypes = {
  contact: PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
};
