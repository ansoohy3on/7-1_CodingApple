import './App.css';
import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
import { createContext, lazy, useEffect, useState, Suspense } from 'react';
import data from './data.js';
import { Route, Routes, Link, useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';

export let Context1 = createContext(); /* context 하나 만들기(state 보관함) */

// import Detail from './routes/Detail.js';
// import Cart from './routes/Cart.js';

const Detail = lazy(() => import('./routes/Detail.js'));
const Cart = lazy(() => import('./routes/Cart.js'));

function App() {

  let [shoes, setShoes] = useState(data);
  let [재고] = useState([10,11,12]);
  let navigate = useNavigate();

  let result = useQuery('작명', ()=>{
    return axios.get('https://codingapple1.github.io/userdata.json').then((a)=>{
      console.log('요청됨')
      return a.data
    })
  })

  useEffect(()=>{
    let arr = [];

    /* 배열이 비어 있을 경우에만 초기화 */
    if(arr.length === 0){
      localStorage.setItem('watched', JSON.stringify(arr)) /* array 생성 */
    }
  },[])

  return (
    <div className="App">

      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">HyeonShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={() => { navigate('/detail') }}>Detail</Nav.Link>
          </Nav>
          <Nav className='ms-auto'>
            { result.isLoading && '로딩 중..💭' } {/* 로딩 시 출력 */}
            { result.error && '에러 😯' } {/* 실패 시 출력 */}
            { result.data && ('반가워요, ' + result.data.name + ' 님!') } {/* 성공 시 출력 */}
          </Nav>
        </Container>
      </Navbar>

      <Suspense fallback={<div>로딩 중..💭</div>}>
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

              <button onClick={()=>{
                axios.get('https://codingapple1.github.io/shop/data2.json')
                .then((result)=>{
                  console.log(result.data)
                  console.log(shoes)
                  let copy = [...shoes, ...result.data];
                  setShoes(copy);
                })
              }}>더보기</button>
            </>
          } />

          <Route path='/detail/:id' element={
              <Context1.Provider value={{재고, shoes}}>
                <Detail shoes={shoes} />
              </Context1.Provider>
          } />

          <Route path='/cart' element={<Cart/>} />

        </Routes>
      </Suspense>
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
