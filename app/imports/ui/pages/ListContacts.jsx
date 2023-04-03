import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import Contact from '../components/Contact';
import { Contacts } from '../../api/contacts/Contact';
import { Notes } from '../../api/notes/Notes';

const ListContacts = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, contacts, notes } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    const subscription1 = Meteor.subscribe(Contacts.userPublicationName);
    const subscription2 = Meteor.subscribe(Notes.userPublicationName);
    // Determine if the subscription is ready
    const rdy1 = subscription1.ready();
    const rdy2 = subscription2.ready();
    const contactItems = Contacts.collection.find({}).fetch();
    const noteItems = Notes.collection.find({}).fetch();
    return {
      contacts: contactItems,
      notes: noteItems,
      ready: rdy1 && rdy2,
    };
  }, []);
  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            <h2>List Contacts</h2>
          </Col>
        </Col>
      </Row>
      <Row xs={1} md={2}>
        {contacts.map(contact => (
          <Col>
            <Contact
              key={contact._id}
              contact={contact}
              notes={notes.filter(note => (note.contactId === contact._id))}
            />
          </Col>
        ))}
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListContacts;
