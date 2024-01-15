import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  let [글제목, 글제목변경] = useState(['오늘의 일기 📖', '내일의 일기 📘', '모레의 일기 📒']);
  let [좋아요, 좋아요변경] = useState(Array(글제목.length).fill(0));
  let [modal, setModal] = useState(false);
  let [title, setTitle] = useState(0);
  let [입력값, 입력값변경] = useState('');

  return (
    <div className="App">
      <div className='blue-nav'>
        <h4>현의 블로그</h4>
      </div>

      {
        글제목.map((a, i)=>{
          return (
            <div className='list' key={i}>
              <h4 onClick={()=>{setModal(!modal); setTitle(i)}}>
                {글제목[i]}
                <span onClick={(e)=>{
                  e.stopPropagation();
                  let copy = [...좋아요];
                  copy[i] = copy[i] + 1;
                  좋아요변경(copy)
                  }}>💜</span>{좋아요[i]}
              </h4>
              <p>1월 9일 발행</p>
              <button className='btn' onClick={()=>{
                let copy = [...글제목];
                copy.splice(i,1);
                글제목변경(copy);
              }}>삭제</button>
            </div>
          )
        })
      }

      <input onChange={e=>{입력값변경(e.target.value)}}></input>
      <button onClick={()=>{
        let copy = [...글제목];
        copy.unshift(입력값);
        글제목변경(copy);
      }}>글 작성</button>

      {
        modal ? <Modal title={title} 글제목={글제목} 글제목변경={글제목변경}/>: null
      }

    </div>

  );

}

function Modal(props){
  return(
    <div className='modal'>
      <h4>{props.글제목[props.title]}</h4>
      <p>날짜</p>
      <p>상세 내용</p>
    </div>
  )
}

export default App;
