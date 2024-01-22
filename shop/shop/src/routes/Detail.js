import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Nav, Row, Col } from "react-bootstrap";
import { addCart } from "./../store.js"
import { useDispatch } from "react-redux";

import {Context1} from './../App.js'

function Detail(props) {

    let {재고, shoes} = useContext(Context1)

    let { id } = useParams();
    let item = props.shoes.find(function (x) {
        return x.id == id
    })
    let itemId = parseInt(id) + 1;
    let [alert, setAlert] = useState(true);
    let [tab, setTab] = useState(0); /* 숫자에 따라 n번째 내용이 보이는 형태 */
    let [fade2, setFade2] = useState('');

    let dispatch = useDispatch();
        
    /* 페이지에 접속 시 최근 본 상품 추가 */
    useEffect(()=>{
        let watchedList = JSON.parse(localStorage.getItem('watched'));
        watchedList.push(id);

        watchedList = new Set(watchedList); /* Array를 Set으로 바꾸기 */
        watchedList = Array.from(watchedList); /* Set을 Array로 바꾸기 */

        localStorage.setItem('watched', JSON.stringify(watchedList));
    },[])
    
    /* 페이지 fade 효과 주기 */
    useEffect(()=>{
        setFade2('end')
        return ()=>{
            setFade2('')
        }
    },[])

    useEffect(()=>{
        let a = setTimeout(()=>{setAlert(false)}, 2000)
        return ()=>{
            clearTimeout(a)
        }
    },[])

    let watchedList = JSON.parse(localStorage.getItem('watched'));

    return (
        <div className={"container start " + fade2}>
            {
                alert == true ?
                <div className="alert alert-warning">
                        2초 이내 구매 시 할인!
                </div>
                : null
            }

            <div className="row">
                <div className="col-md-6">
                    <img src={"https://codingapple1.github.io/shop/shoes" + itemId + ".jpg"} width="100%" />
                </div>

                <div className="col-md-6">
                    <h4 className="pt-5">{item.title}</h4>
                    <p>{item.content}</p>
                    <p>{item.price}원</p>
                    <button className="btn btn-danger" onClick={()=>{
                        dispatch(addCart({id:id, name:item.title, count: 1}))
                    }}>주문하기</button>
                </div>
            </div>

            <div>
                <h5>최근 본 항목</h5>
                <Row>
                    {
                        watchedList.map((id, i)=>{
                            let shoe = shoes[id];
                            return(
                                <div key={i}>
                                    <Col>
                                        <Link to={'/detail/'+shoe.id}>
                                            {shoe.title}
                                        </Link>
                                    </Col>
                                </div>
                            )
                        })
                    }
                </Row>
            </div>

            <Nav variant="tabs"  defaultActiveKey="link0">
                <Nav.Item>
                <Nav.Link eventKey="link0" onClick={()=>{setTab(0)}}>버튼0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link eventKey="link1" onClick={()=>{setTab(1)}}>버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link eventKey="link2" onClick={()=>{setTab(2)}}>버튼2</Nav.Link>
                </Nav.Item>
            </Nav>

            <TabContent tab={tab} shoes={props.shoes}/>

        </div>
    )
}

function TabContent({tab, shoes}){
    let [fade, setFade] = useState('')
    let {재고} = useContext(Context1)
    
    useEffect(()=>{
        let a = setTimeout(()=>{setFade('end')}, 100)
        return()=>{
            clearTimeout(a)
            setFade('')
        }
    },[tab])

    return(
        <div className={'start ' + fade}>
            { [<div>{shoes[0].title}</div>, <div>내용1</div>, <div>내용2</div>][tab] }
        </div>
    )
}

export default Detail;