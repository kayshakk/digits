import React from 'react';
import PropTypes from 'prop-types';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, HiddenField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Notes } from '../../api/notes/Notes';

const schema = Notes.schema;
const bridge = new SimpleSchema2Bridge(schema);

const AddNote = ({ owner, contactId }) => {

  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { note, createdAt } = data;
    Notes.collection.insert(
      { note, owner, contactId, createdAt },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      },
    );
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center"><h2>Add Contacts</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <TextField name="note" />
                <SubmitField value="Submit" />
                <ErrorsField />
                <HiddenField name="owner" value={owner} />
                <HiddenField name="contactId" value={contactId} />
                <HiddenField name="createdAt" value={new Date()} />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

AddNote.propTypes = {
  owner: PropTypes.string.isRequired,
  contactId: PropTypes.string.isRequired,
};

export default AddNote;
