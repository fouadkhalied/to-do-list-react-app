







import React, { useRef, useState } from 'react';
import './App.css';

function App() {
  const [x,setx] = useState([]);
  const inputref = useRef();
  ///////////////////////////////////////////////////
  const add = ()=>{
  const value = inputref.current.value;
  if (value=="") {
    alert("input is empty");
    return;
  }
  const newData = {completed : false , value}
    setx([...x,newData])
    inputref.current.value = "";
  }
  ///////////////////////////////////////////////////
  const itemDone =(index)=>{
    const new_x = [...x];
    x[index].completed = !x[index].completed;
    setx(new_x)
  }
  //////////////////////////////////////////////////
  const toDelete =(index)=>{
    const new_x = [...x];
    new_x.splice(index,1)
    setx(new_x)
  }
  return (
    <div className='app'> 
      <h2>To-do List</h2>
      <ul>
          {
            x.map(({completed,value} , index)=>{
              return <div className='div10'>
              <li className={completed ? "differntstyle" : ""} onClick={()=>itemDone(index)}>{value}</li>
              <span onClick={()=>{toDelete(index)}}>X</span>
              </div>
            })
          }
      </ul>
      <input ref={inputref} className='input1' placeholder='Enter new task ...' />
      <button onClick={add}>add</button>
    </div>
)}


export default App;