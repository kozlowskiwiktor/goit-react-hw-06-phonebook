import propTypes from 'prop-types';
import { nanoid } from '@reduxjs/toolkit';
import css from 'container.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from '../../redux/selectors';
import { addContact } from '../../redux/contactsSlice';

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const handleSubmit = e => {
    e.preventDefault();

    const form = e.target;
    const name = form.elements.name.value;
    const number = form.elements.number.value;
    form.reset();

    const newContact = {
      name: name,
      number: number,
      id: nanoid(),
    };
    if (contacts.contacts.find(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
    } else {
      dispatch(addContact(newContact));

      const localStorageContacts =
        JSON.parse(localStorage.getItem('contacts')) || [];
      localStorageContacts.push(newContact);
      localStorage.setItem('contacts', JSON.stringify(localStorageContacts));
    }
  };

  return (
    <form onSubmit={handleSubmit} className={css.container}>
      <label>Name</label>
      <input
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <label>Phone</label>
      <input
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <button type="submit">Add contact</button>
    </form>
  );
};

export default ContactForm;

ContactForm.propTypes = { onSubmit: propTypes.func };
