import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
// import Paginate from '../components/Paginate';
import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';

const ProductListScreen = ({ history, match }) => {
  // const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login');
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts(''));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h2 class='sub-heading mb-0'>Products</h2>
        </Col>
        <Col className='text-right'>
          <Button className='my-3 btn-sm' onClick={createProductHandler}>
            <i className='fas fa-plus mr-1'></i> Create Product
          </Button>
        </Col>
      </Row>

      {loadingDelete && <Loader />}
      {errorDelete && (
        <Card className='box'>
          <Message variant='danger'>{errorDelete}</Message>
        </Card>
      )}
      {loadingCreate && <Loader />}
      {errorCreate && (
        <Card className='box'>
          <Message variant='danger'>{errorCreate}</Message>
        </Card>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Card className='box'>
          <Message variant='danger'>{error}</Message>
        </Card>
      ) : (
        <Card className='box'>
          <div className='table-responsive tableFixHead'>
            <Table striped bordered hover className='table-sm mb-0'>
              <thead>
                <tr className='text-center'>
                  <th className='text-left'>ID</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>CATEGORY</th>
                  <th>BRAND</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td className='text-right'>${product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td className='text-center'>
                      <LinkContainer to={`/admin/product/${product._id}/edit`}>
                        <Button variant='warning' className='btn-sm'>
                          <i className='fas fa-edit'></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant='danger'
                        className='btn-sm ml-1'
                        onClick={() => deleteHandler(product._id)}>
                        <i className='fas fa-trash'></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          {/* <Paginate pages={pages} page={page} isAdmin={true} /> */}
        </Card>
      )}
    </>
  );
};

export default ProductListScreen;
