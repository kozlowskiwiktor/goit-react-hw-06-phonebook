import { createSlice } from "@reduxjs/toolkit";

const savedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
const initialState = {
    contacts: savedContacts,
}

export const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        addContact(state, action) {
            state.contacts.push(action.payload)
        },
        deleteContact(state, action) {
            state.contacts = state.contacts.filter(
                contact => contact.id !== action.payload
            )
        }
    }
})

export const { addContact, deleteContact } = contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;