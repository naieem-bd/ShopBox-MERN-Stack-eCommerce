import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from 'react-bootstrap';
import Rating from '../components/Rating';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';

import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';
import TopProductsSidebar from '../components/TopProductsSidebar';

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment('');
    }
    if (!product._id || product._id !== match.params.id) {
      dispatch(listProductDetails(match.params.id));
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
  }, [dispatch, match, successProductReview]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    );
  };

  return (
    <div className='product-details'>
      <Link className='btn btn-primary btn-sm mb-3' to='/'>
        <i className='fas fa-home mr-1'></i>
        Home
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Meta title={product.name} />
          <Row>
            <Col md={6} className='mb-4'>
              <Image
                className='boxShadow'
                src={product.image}
                alt={product.name}
                fluid
              />
            </Col>
            <Col md={6} className='mb-4'>
              <div className='pro-dtl-box'>
                <h3>{product.name}</h3>
                <p>
                  <span>Brand : </span> {product.brand}
                </p>
                <p>
                  <span>Category : </span> {product.category}
                </p>
                <p>
                  <span>Abailability : </span>
                  {product.countInStock > 0 ? (
                    <span style={{ color: 'green' }}>In Stock</span>
                  ) : (
                    <span style={{ color: 'red' }}>Out Of Stock</span>
                  )}
                </p>
                <div className='mt-3'>
                  <Rating
                    value={product.rating}
                    text={`(${product.numReviews} Reviews)`}
                  />
                </div>
                <h3>
                  Price: <strong>${product.price}</strong>
                </h3>
                <div className='d-flex'>
                  <Form.Control
                    disabled={product.countInStock === 0}
                    className='mr-2'
                    as='select'
                    style={{ width: 70 }}
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}>
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </Form.Control>
                  <Button
                    onClick={addToCartHandler}
                    type='button'
                    disabled={product.countInStock === 0}>
                    <i className='fas fa-shopping-basket mr-2'></i>
                    Add To Cart
                  </Button>
                </div>
                {/* <hr /> */}
                <p className='mt-4'>
                  <span>Description : </span>className=
                  {product.description}
                </p>
              </div>
            </Col>
          </Row>

          <hr className='mb-5' />

          <Row>
            <Col md={7}>
              <h2 className='sub-heading'>Customers Reviews</h2>
              <Card className='box pb-1'>
                {product.reviews.length === 0 && <Message>No Reviews</Message>}
                <ListGroup variant='flush'>
                  {product.reviews.map((review) => (
                    <ListGroup.Item key={review._id} className='px-0'>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} />
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                  <ListGroup.Item className='px-0'>
                    <h2>Write a Customer Review</h2>
                    {successProductReview && (
                      <Message variant='success'>
                        Review submitted successfully
                      </Message>
                    )}
                    {loadingProductReview && <Loader />}
                    {errorProductReview && (
                      <Message variant='danger'>{errorProductReview}</Message>
                    )}
                    {userInfo ? (
                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId='rating'>
                          <Form.Label>Rating</Form.Label>
                          <Form.Control
                            as='select'
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}>
                            <option value=''>Select...</option>
                            <option value='1'>1 - Poor</option>
                            <option value='2'>2 - Fair</option>
                            <option value='3'>3 - Good</option>
                            <option value='4'>4 - Very Good</option>
                            <option value='5'>5 - Excellent</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='comment'>
                          <Form.Label>Comment</Form.Label>
                          <Form.Control
                            as='textarea'
                            row='3'
                            value={comment}
                            onChange={(e) =>
                              setComment(e.target.value)
                            }></Form.Control>
                        </Form.Group>
                        <Button
                          disabled={loadingProductReview}
                          type='submit'
                          variant='primary'>
                          Submit
                        </Button>
                      </Form>
                    ) : (
                      <Message>
                        Please <Link to='/login'>sign in</Link> to write a
                        review{' '}
                      </Message>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
            <Col md={5}>
              <h2 className='sub-heading'>Top Products</h2>
              <TopProductsSidebar />
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default ProductScreen;
