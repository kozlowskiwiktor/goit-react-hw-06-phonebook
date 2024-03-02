import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactsSlice';

const ContactListItem = ({ contact }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContact(contact.id));

    const contactsLocalStorage = JSON.parse(localStorage.getItem('contacts'));
    const updatedContacts = contactsLocalStorage.filter(
      item => item.id !== contact.id
    );

    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
  };

  return (
    <div>
      <span>
        {contact.name} - {contact.number}
      </span>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default ContactListItem;
