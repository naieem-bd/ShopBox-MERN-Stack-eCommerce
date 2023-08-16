import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { listProductDetails, updateProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push('/admin/productlist');
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, history, productId, product, successUpdate]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload', formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    );
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h2 className='sub-heading mb-0'>Create / Edit Product</h2>
        </Col>
        <Col className='text-right'>
          <Link to='/admin/productlist' className='btn btn-secondary my-3'>
            Product List
          </Link>
        </Col>
      </Row>

      <Card className='box'>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Row>
              <Col lg='12'>
                <Form.Group controlId='name'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type='name'
                    placeholder='Enter name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}></Form.Control>
                </Form.Group>
              </Col>
              <Col lg='6'>
                <Form.Group controlId='price'>
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Enter price'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}></Form.Control>
                </Form.Group>
              </Col>

              <Col lg='6'>
                <Form.Group controlId='countInStock'>
                  <Form.Label>Count In Stock</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Enter countInStock'
                    value={countInStock}
                    onChange={(e) =>
                      setCountInStock(e.target.value)
                    }></Form.Control>
                </Form.Group>
              </Col>

              <Col lg='6'>
                <Form.Group controlId='category'>
                  <Form.Label>Category</Form.Label>
                  {/* <Form.Control
                  type='text'
                  placeholder='Enter category'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}></Form.Control> */}
                  <Form.Control
                    as='select'
                    className='category'
                    type='text'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}>
                    <option value=''>Select Category</option>
                    <option value='Electronics'>Electronics</option>
                    <option value='Fashion and Apparel'>
                      Fashion and Apparel
                    </option>
                    <option value='Home and Living'>Home and Living</option>
                    <option value='Automotive'>Automotive</option>
                  </Form.Control>
                </Form.Group>
              </Col>

              <Col lg='6'>
                <Form.Group controlId='brand'>
                  <Form.Label>Brand</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter brand'
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}></Form.Control>
                </Form.Group>
              </Col>

              <Col lg='6'>
                <Form.Group controlId='image'>
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter image url'
                    value={image}
                    onChange={(e) => setImage(e.target.value)}></Form.Control>
                  {/* <Form.File
                    id='image-file'
                    label='Choose File'
                    custom
                    onChange={uploadFileHandler}></Form.File>
                  {uploading && <Loader />} */}
                </Form.Group>
              </Col>
              <Col lg='6'>
                <Form.Group controlId='image'>
                  <Form.Label>Upload Image</Form.Label>
                  {/* <Form.Control
                    type='text'
                    placeholder='Enter image url'
                    value={image}
                    onChange={(e) => setImage(e.target.value)}></Form.Control> */}
                  <Form.File
                    id='image-file'
                    label='Choose File'
                    custom
                    onChange={uploadFileHandler}></Form.File>
                  {uploading && <Loader />}
                </Form.Group>
              </Col>
              <Col lg='12'>
                <Form.Group controlId='description'>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter description'
                    value={description}
                    onChange={(e) =>
                      setDescription(e.target.value)
                    }></Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </Card>
    </>
  );
};

export default ProductEditScreen;
