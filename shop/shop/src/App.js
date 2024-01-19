import './App.css';
import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
import { createContext, useState } from 'react';
import data from './data.js';
import { Route, Routes, Link, useNavigate, Outlet } from 'react-router-dom';
import Detail from './routes/Detail.js';
import axios from 'axios';

export let Context1 = createContext(); /* context 하나 만들기(state 보관함) */


function App() {

  let [shoes, setShoes] = useState(data);
  let [재고] = useState([10,11,12]);

  let navigate = useNavigate();

  return (
    <div className="App">

      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">HyeonShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={() => { navigate('/detail') }}>Detail</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path='/' element={
          <>
            <div className='main-bg'></div>
            <Container>
              <Row>
                {
                  shoes.map((a, i) => {
                    return (
                      <Card shoes={shoes[i]} i={i} />
                    )
                  })
                }
              </Row>
            </Container>
          </>
        } />

        <Route path='/detail/:id' element={
          <Context1.Provider value={{재고, shoes}}>
            <Detail shoes={shoes} />
          </Context1.Provider>
        } />
      </Routes>

      <button onClick={()=>{
        axios.get('https://codingapple1.github.io/shop/data2.json')
        .then((result)=>{
          console.log(result.data)
          console.log(shoes)
          let copy = [...shoes, ...result.data];
          setShoes(copy);
        })
      }}>더보기</button>

    </div>
  );
}

function About() {
  return (
    <div>
      <h4>회사 정보</h4>
      <Outlet></Outlet>
    </div>
  )
}

function Card(props) {
  return (
    <Col sm>
      <Link to={"/detail/"+(props.i)}>
        <img src={'https://codingapple1.github.io/shop/shoes' + (props.i + 1) + '.jpg'} width='80%' />
      </Link>
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content}</p>
      <p>{props.shoes.price}</p>
    </Col>
  )
}

export default App;
