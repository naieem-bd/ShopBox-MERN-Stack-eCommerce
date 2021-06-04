import React from 'react'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'

const App = () => {
  return (
    <>
      <Header/>
      <main className='py-3'>
        <Container>
				  <p>main content goes here</p>
        </Container>
			</main>
			<Footer/>
    </>
  );
}

export default App;
