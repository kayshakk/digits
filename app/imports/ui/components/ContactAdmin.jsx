import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

/** Renders a single row in the List Stuff (Admin) table. See pages/ListStuffAdmin.jsx. */
const ContactAdmin = ({ contact }) => (
  <Card className="h-100">
    <Card.Header> <img src={contact.image} alt="pfp" width="75" /></Card.Header>
    <Card.Body>
      <Card.Title>{contact.firstName} {contact.lastName}</Card.Title>
      <Card.Subtitle>{contact.address}</Card.Subtitle>
      <Card.Text>{contact.description}</Card.Text>
      <Card.Footer> {contact.owner}</Card.Footer>
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
ContactAdmin.propTypes = {
  contact: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    address: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    owner: PropTypes.string,
  }).isRequired,
};

export default ContactAdmin;
