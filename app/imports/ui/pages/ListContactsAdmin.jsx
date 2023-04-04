import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { Contacts } from '../../api/contacts/Contact';
import ContactAdmin from '../components/ContactAdmin';

const ListContacts = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, contacts } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    const subscription = Meteor.subscribe(Contacts.adminPublicationName);
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    const contactItems = Contacts.collection.find({}).fetch();
    return {
      contacts: contactItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col md={7}>
          <Col className="text-center">
            <h2>List Contacts (Admin)</h2>
          </Col>
        </Col>
      </Row>
      <Row xs={1} md={2}>
        {contacts.map(contact => (
          <Col>
            <ContactAdmin contact={contact} />
          </Col>
        ))}
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default ListContacts;
