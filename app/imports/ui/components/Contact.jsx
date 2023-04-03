import React from 'react';
import PropTypes from 'prop-types';
import { Card, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Note from './Note';
import AddNote from './AddNote';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const Contact = ({ contact, notes }) => (
  <Card className="h-100">
    <Card.Header> <img src={contact.image} alt="pfp" width="75" /></Card.Header>
    <Card.Body>
      <Card.Title>{contact.firstName} {contact.lastName}</Card.Title>
      <Card.Subtitle>{contact.address}</Card.Subtitle>
      <Card.Text>{contact.description}</Card.Text>
      <ListGroup variant="flush">
        {notes.map((note) => <Note key={note._id} note={note} />)}
      </ListGroup>
      <AddNote owner={contact.owner} contactId={contact._id} />
      <Link to={`/edit/${contact._id}`}>Edit</Link>
    </Card.Body>
  </Card>
);

// Require a document to be passed to this component.
Contact.propTypes = {
  contact: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    address: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    owner: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  notes: PropTypes.arrayOf((propValue, key, componentName, location, propFullName) => {
    if (!Note.test(propValue[key])) {
      return new Error(
        `Invalid prop \`${propFullName}\` supplied to` +
        ` \`${componentName}\`. Validation failed.`,
      );
    }
    return true;
  }).isRequired,
};

export default Contact;
