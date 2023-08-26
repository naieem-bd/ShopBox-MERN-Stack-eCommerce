import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Form, Card } from 'react-bootstrap';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import TopRatedProducts from '../components/TopRatedProducts';
import ServiceBanner from '../components/ServiceBanner';
import NoProductFound from '../components/NoProductFound';
import Meta from '../components/Meta';
import { listProducts } from '../actions/productActions';

const HomeScreen = ({ match }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {!keyword ? (
        // <ProductCarousel />
        <>
          <TopRatedProducts />
          <ServiceBanner />
        </>
      ) : (
        <Link className='btn btn-primary btn-sm mb-3' to='/'>
          <i class='fas fa-home mr-1'></i>
          Home
        </Link>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <div className='mb-5'>
            {!keyword ? (
              <Row>
                <Col md={8} lg={9}>
                  {selectedCategory ? (
                    <h2 className='sub-heading'>{selectedCategory} Products</h2>
                  ) : (
                    <h2 className='sub-heading'>Latest All Products</h2>
                  )}
                </Col>
                <Col md={4} lg={3}>
                  <Form.Control
                    as='select'
                    size='sm'
                    className='category'
                    type='text'
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}>
                    <option value=''>All Category</option>
                    <option value='Electronics'>Electronics</option>
                    <option value='Fashion and Apparel'>
                      Fashion and Apparel
                    </option>
                    <option value='Home and Living'>Home and Living</option>
                    <option value='Automotive'>Automotive</option>
                  </Form.Control>
                </Col>
              </Row>
            ) : (
              <h2 className='sub-heading'>Search results of "{keyword}"</h2>
            )}

            <Row>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))
              ) : (
                <Col md={12}>
                  <NoProductFound />
                </Col>
              )}
            </Row>
            <Paginate
              pages={pages}
              page={page}
              keyword={keyword ? keyword : ''}
            />
          </div>
        </>
      )}
    </>
  );
};

export default HomeScreen;
