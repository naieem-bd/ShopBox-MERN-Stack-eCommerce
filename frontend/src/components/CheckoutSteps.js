import React from 'react';
import { Card, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className='justify-content-center mb-4'>
      <Nav.Item>
        {step1 ? (
          <LinkContainer to='/login'>
            <Nav.Link className='btn btn-primary btn-sm px-2 py-1 mx-2'>
              Sign In
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link
            disabled
            className='btn btn-secondary btn-sm px-2 py-1 mx-2'>
            Sign In
          </Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <LinkContainer to='/shipping'>
            <Nav.Link className='btn btn-primary btn-sm px-2 py-1 mx-2'>
              Shipping
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link
            disabled
            className='btn btn-secondary btn-sm px-2 py-1 mx-2'>
            Shipping
          </Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <LinkContainer to='/payment'>
            <Nav.Link className='btn btn-primary btn-sm px-2 py-1 mx-2'>
              Payment
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link
            disabled
            className='btn btn-secondary btn-sm px-2 py-1 mx-2'>
            Payment
          </Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <LinkContainer to='/placeorder'>
            <Nav.Link className='btn btn-primary btn-sm px-2 py-1 mx-2'>
              Place Order
            </Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link
            disabled
            className='btn btn-secondary btn-sm px-2 py-1 mx-2'>
            Place Order
          </Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
