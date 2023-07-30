import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Image } from 'react-bootstrap';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Card className='mb-4 box sgl-product'>
      <Link to={`/product/${product._id}`}>
        <Image src={product.image} fluid />
      </Link>

      <Card.Body className='p-0 mt-1'>
        <div className='product-info'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} Reviews`}
          />
          <p className='pro-name line-clamp-1 mb-2 mt-1'>
            <Link to={`/product/${product._id}`}>{product.name}</Link>
          </p>
          <div className='rating-box'>
            <p className='pro-price'>${product.price}</p>

            <Button variant='outline-primary' size='sm'>
              <i class='fas fa-plus mr-2'></i>
              Cart
            </Button>
          </div>
        </div>

        {/* <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link> */}
        {/* <Card.Text as='div' className='mb-2'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text> */}

        {/* <Card.Text as='h3'>${product.price}</Card.Text> */}
      </Card.Body>
    </Card>
  );
};

export default Product;
