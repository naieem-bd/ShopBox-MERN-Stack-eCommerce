import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const FormContainer = ({ children }) => {
  return (
    <Row className='justify-content-md-center align-items-center logRegForm'>
      <Col xs={12} md={6}>
        {children}
      </Col>
    </Row>
  );
};

export default FormContainer;
