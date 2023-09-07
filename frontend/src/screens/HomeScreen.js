import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Form, Card, Pagination } from 'react-bootstrap';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import TopRatedProducts from '../components/TopRatedProducts';
import ServiceBanner from '../components/ServiceBanner';
import NoProductFound from '../components/NoProductFound';
import Meta from '../components/Meta';
import { listProducts } from '../actions/productActions';

const HomeScreen = ({ match }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12); // Number of products per page
  const keyword = match.params.keyword;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setCurrentPage(1); // Reset page when category changes
  };

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <>
      <Meta />
      {!keyword ? (
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
                    onChange={(e) => handleCategoryChange(e.target.value)}>
                    <option value=''>All Category</option>
                    <option value='Electronics'>Electronics</option>
                    <option value='Fashion and Apparel'>
                      Fashion and Apparel
                    </option>
                    <option value='Home and Living'>Home and Living</option>
                  </Form.Control>
                </Col>
              </Row>
            ) : (
              <h2 className='sub-heading'>Search results of "{keyword}"</h2>
            )}

            <Row>
              {currentProducts.length > 0 ? (
                currentProducts.map((product) => (
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

            {filteredProducts.length >= productsPerPage && (
              <Pagination>
                {Array.from({
                  length: Math.ceil(filteredProducts.length / productsPerPage),
                }).map((_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => setCurrentPage(index + 1)}>
                    {index + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default HomeScreen;
