import React, { useEffect } from 'react';
import { Badge, Card, Col, Row, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';

import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';
import Message from './Message';
import { listTopProducts } from '../actions/productActions';

const TopProductsSidebar = () => {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    products.map((product) => (
      <Card className='box mb-4' key={product._id}>
        <Badge pill variant='warning' className='text-white'>
          Top
        </Badge>
        <Row className='align-items-center'>
          <Col xs={3}>
            <Link to={`/product/${product._id}`}>
              <Image src={product.image} fluid />
            </Link>
          </Col>
          <Col xs={9}>
            <div className='product-info'>
              <p className='pro-name line-clamp-2'>
                <Link to={`/product/${product._id}`}>{product.name}</Link>
              </p>
              <div className='pro-rivew my-2'>
                <Rating
                  value={product.rating}
                  text={`(${product.numReviews} Reviews)`}
                />
              </div>
              <div className='d-flex justify-content-between'>
                <p className='pro-price'>Price: ${product.price}</p>
                <Link to={`/product/${product._id}`}>
                  <Button variant='outline-primary' size='sm'>
                    Details
                  </Button>
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Card>
    ))
  );
};

export default TopProductsSidebar;
