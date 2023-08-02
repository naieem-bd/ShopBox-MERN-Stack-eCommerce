import React from 'react';
import { Card } from 'react-bootstrap';

const NoProductFound = () => {
  return (
    <Card className='box'>
      <div className='no-product'>
        <i class='far fa-frown'></i>
        <p>Sorry! No Product Found.</p>
      </div>
    </Card>
  );
};

export default NoProductFound;
