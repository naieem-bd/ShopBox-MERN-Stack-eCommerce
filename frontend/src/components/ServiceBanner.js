import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

const ServiceBanner = () => {
  return (
    <>
      <Card className='box service-box-wrap mb-5'>
        <Row>
          <Col lg={3} xs={6}>
            <div className='service-box'>
              <div className='service-icon'>
                <i class='fas fa-trophy'></i>
              </div>
              <div className='service-text'>
                <h4>Best Quality</h4>
                <p>Original Product Guarenteed</p>
              </div>
            </div>
          </Col>
          <Col lg={3} xs={6}>
            <div className='service-box'>
              <div className='service-icon'>
                <i class='fas fa-shield-alt'></i>
              </div>
              <div className='service-text'>
                <h4>Secure Payment</h4>
                <p>100% Secure Online Payment</p>
              </div>
            </div>
          </Col>
          <Col lg={3} xs={6}>
            <div className='service-box'>
              <div className='service-icon'>
                <i class='fas fa-undo-alt'></i>
              </div>
              <div className='service-text'>
                <h4>Free Return</h4>
                <p>Get Return within 30 days</p>
              </div>
            </div>
          </Col>
          <Col lg={3} xs={6}>
            <div className='service-box'>
              <div className='service-icon'>
                <i class='fas fa-shipping-fast'></i>
              </div>
              <div className='service-text'>
                <h4>Free Shipping</h4>
                <p>When ordering over $100</p>
              </div>
            </div>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default ServiceBanner;
