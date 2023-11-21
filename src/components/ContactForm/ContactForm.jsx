import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, ErrorMessage } from 'formik';
import { nanoid } from 'nanoid';
import { FormField, Input, Label } from './ContactForm.styled';
import Button from '../Button';
import { addContact } from 'redux/contactsSlice';

export const ContactForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    name: '',
    number: '',
  };

  const handleSubmit = (contacts, { setSubmitting, resetForm }) => {
    const isValidName = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/.test(contacts.name);
    const isValidNumber = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(contacts.number);

    if (!isValidName) {
      setSubmitting(false);
      alert('Invalid name. Please enter a valid name.');
      return;
    }

    if (!isValidNumber) {
      setSubmitting(false);
      alert('Invalid phone number. Please enter a valid phone number.');
      return;
    }

    const contact = {
      id: nanoid(),
      ...contacts,
    };
    dispatch(addContact(contact));
    resetForm();
  };

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <FormField>
            <Label htmlFor="name">
              Contact Name
              <Input
                type="text"
                name="name"
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
              />
              {!/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/.test(initialValues.name) && <div className="alert"></div>}
            </Label>
            <ErrorMessage name="name" component="div" />
          </FormField>

          <FormField>
            <Label htmlFor="number">
              Contact Number
              <Input
                type="tel"
                name="number"
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
              />
              {!/^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(initialValues.number) && <div className="alert"></div>}
            </Label>
            <ErrorMessage name="number" component="div" />
          </FormField>

          <Button type={'submit'} title={'Add Contact'} />
        </Form>
      </Formik>
    </div>
  );
};

export default ContactForm;