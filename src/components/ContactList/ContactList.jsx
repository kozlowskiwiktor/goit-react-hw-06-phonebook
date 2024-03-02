import propTypes from 'prop-types';
import css from 'container.module.css';
import { useSelector } from 'react-redux';
import { getContacts, getFilter } from '../../redux/selectors';
import ContactListItem from 'components/ContactListItem/ContactListItem';

const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const contactsList = contacts.contacts;

  if (!contacts) {
    return null;
  }

  const filteredContacts = filter
    ? contactsList.filter(contact =>
        contact.name.toLowerCase().includes(filter.text)
      )
    : contactsList;

  return (
    <div className={css.container}>
      <ul>
        {filteredContacts.map(contact => (
          <li key={contact.id}>
            <ContactListItem contact={contact} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;

ContactList.propTypes = {
  contacts: propTypes.arrayOf(propTypes.object),
};
