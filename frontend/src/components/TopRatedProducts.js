import React from 'react';
import { Row, Col, Card, Image, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ImgTablate from '../images/tablate.jpg';
import ImgHeadphone from '../images/headphone.jpg';
import ImgDron from '../images/dron.jpg';
import ImgAirphone from '../images/airphone.jpg';
import Rating from './Rating';

const TopRatedProducts = () => {
  return (
    <>
      <Row>
        <Col lg={7}>
          <Card className='box top-big py-4 mb-4'>
            <Badge pill variant='warning' className='text-white'>
              Top Rated
            </Badge>
            <Row>
              <Col xs={7}>
                <Image
                  src={ImgTablate}
                  fluid
                  className='my-1'
                  style={{ paddingTop: 2 }}
                />
              </Col>
              <Col xs={5}>
                <div className='product-info mb-4 pt-4 pb-3'>
                  <p className='pro-name mt-4'>
                    <Link to='#'>The product name will goes here...</Link>
                  </p>
                  <div className='pro-rivew my-3'>
                    <Rating value={4} text='7 reviews' />
                  </div>
                  <p className='pro-price'>Price: $527</p>
                </div>
                <Button variant='outline-primary'>
                  <i class='fas fa-plus mr-2'></i>
                  Add To Cart
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col lg={5}>
          <Card className='box mb-4'>
            <Badge pill variant='warning' className='text-white'>
              Top Rated
            </Badge>
            <Row>
              <Col xs={5}>
                <Image src={ImgDron} fluid />
              </Col>
              <Col xs={7}>
                <div className='product-info'>
                  <p className='pro-name mt-2'>
                    <Link to='#'>The product name will</Link>
                  </p>
                  <div className='pro-rivew my-2'>
                    <Rating value={4} text='7 Reviews' />
                  </div>
                  <p className='pro-price mb-3'>Price: $527</p>
                  <Button variant='outline-primary' size='sm'>
                    <i class='fas fa-plus mr-2'></i>
                    Add To Cart
                  </Button>
                </div>
              </Col>
            </Row>
          </Card>
          <Card className='box mb-4'>
            <Badge pill variant='warning' className='text-white'>
              Top Rated
            </Badge>
            <Row>
              <Col xs={5}>
                <Image src={ImgHeadphone} fluid />
              </Col>
              <Col xs={7}>
                <div className='product-info'>
                  <p className='pro-name mt-2'>
                    <Link to='#'>The product name will</Link>
                  </p>
                  <div className='pro-rivew my-2'>
                    <Rating value={4} text='7 Reviews' />
                  </div>
                  <p className='pro-price mb-3'>Price: $527</p>
                  <Button variant='outline-primary' size='sm'>
                    <i class='fas fa-plus mr-2'></i>
                    Add To Cart
                  </Button>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default TopRatedProducts;
