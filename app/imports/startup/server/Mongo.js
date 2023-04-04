import { Meteor } from 'meteor/meteor';
import { Contacts } from '../../api/contacts/Contact';

/* eslint-disable no-console */

// Initialize the database with a default data document.
const addContact = data => {
  console.log(`  Adding: ${data.firstName} (${data.owner})`);
  Contacts.collection.insert(data);
};

if (Contacts.collection.find().count() === 0) {
  if (Meteor.settings.defaultContacts) {
    console.log('Creating default contact.');
    Meteor.settings.defaultContacts.forEach(data => addContact(data));
  }
}
