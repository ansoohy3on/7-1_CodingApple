import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Nav } from "react-bootstrap";

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

    return (
        <div className={"container start " + fade2}>
            {
                alert == true ?
                <div className="alert alert-warning">
                        2초 이내 구매 시 할인!
                </div>
                : null
            }

            {재고}
            <div className="row">
                <div className="col-md-6">
                    <img src={"https://codingapple1.github.io/shop/shoes" + itemId + ".jpg"} width="100%" />
                </div>

                <div className="col-md-6">
                    <h4 className="pt-5">{item.title}</h4>
                    <p>{item.content}</p>
                    <p>{item.price}원</p>
                    <button className="btn btn-danger">주문하기</button>
                </div>
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