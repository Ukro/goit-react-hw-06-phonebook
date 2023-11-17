import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { toast } from 'react-toastify';

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    filter: '',
  },

  reducers: {
    addContact(state, action) {
      console.log(action.payload.name);
      if (
        state.contacts.find(
          ({ name }) =>
            name.toLowerCase() === action.payload.name.trim().toLowerCase()
        )
      ) {
        toast.error(`${action.payload.name} is already in contacts!`);
        return;
      }

      state.contacts.push(action.payload);
      toast.success(`${action.payload.name} was added to contacts!`);
    },

    deleteContact(state, action) {
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload.id
      );
      toast.success(`${action.payload.name} was deleted!`);
    },

    setFilter(state, action) {
      state.filter = action.payload;
    },

    resetFilter(state) {
      state.filter = '';
    },
  },
});

const persistConfig = {
  key: 'contacts',
  version: 1,
  storage,

  whitelist: ['contacts'],
};

export const persistedContactsReducer = persistReducer(
  persistConfig,
  contactsSlice.reducer
);

export const { addContact, deleteContact, setFilter, resetFilter } =
  contactsSlice.actions;
