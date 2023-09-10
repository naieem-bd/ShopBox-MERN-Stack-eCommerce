import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Form,
  Button,
  Row,
  Col,
  Card,
  InputGroup,
  FormControl,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { register } from '../actions/userActions';

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Password do not match');
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <FormContainer>
      <Card className='box p-5'>
        <h2 class='sub-heading mb-5'>Sign Up</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <InputGroup className='mb-4'>
            <InputGroup.Prepend>
              <InputGroup.Text>
                <i class='fas fa-user'></i>
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              type='name'
              placeholder='User Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </InputGroup>

          <InputGroup className='mb-4'>
            <InputGroup.Prepend>
              <InputGroup.Text>
                <i class='fas fa-envelope'></i>
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              type='email'
              placeholder='Email Address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputGroup>

          <InputGroup className='mb-4'>
            <InputGroup.Prepend>
              <InputGroup.Text>
                <i class='fas fa-key'></i>
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>

          <InputGroup className='mb-4'>
            <InputGroup.Prepend>
              <InputGroup.Text>
                <i class='fas fa-key'></i>
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              type='password'
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </InputGroup>

          <Button type='submit' variant='primary' block>
            Sign Up
          </Button>
        </Form>

        <div className='mt-4'>
          Have an Account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </div>
      </Card>
    </FormContainer>
  );
};

export default RegisterScreen;
