







import './App.css';
import { useState , useEffect , useRef } from "react";
import React from "react";
import Table from 'react-bootstrap/Table';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Print from './print';
const Todo_list = () => {
    const [x,setx] = useState(JSON.parse(localStorage.getItem('table')) || []);
    const [y,sety] = useState(JSON.parse(localStorage.getItem('total')) || 0);
    const inputref = useRef();
    const inputref1 = useRef();
    const inputref2 = useRef();
    ///////////////////////////////////////////////////
    const add = ()=>{
    const value = inputref2.current.value;
    const value1 = inputref1.current.value;
    const value2 = inputref.current.value;
    const result = value1 * value;

    if (value=="" || value1 == "" || value2 == "") {
      alert("input is empty");
      return;
    }

    const newData = [result , value ,  value1 , value2 ]
      setx([...x,newData]);
      inputref.current.value = "";
      inputref1.current.value = "";
      inputref2.current.value = "";
      sety(y + result);
      
      console.log(x);
    }
    useEffect(() => {
        localStorage.setItem('table',JSON.stringify(x) || []);
        localStorage.setItem('total',JSON.stringify(y) || 0);
      }, [x]);
    ///////////////////////////////////////////////////
    const send = (par) =>{
       window.location = '/print'
    }
    //////////////////////////////////////////////////
    const new_ = () =>{
       localStorage.setItem('table' , JSON.stringify([]));
       localStorage.setItem('total' , JSON.stringify(0));
       setx([]);
       sety(0);
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
        {/* <ul>
            {
              x.map((item , index)=>{
                return <div className='div10'>
                <li>{item[0]}</li>
                <span onClick={()=>{toDelete(index)}}>X</span>
                </div>
              })
            }
        </ul> */}
        <div className='head'>
          {y}
          <label>الاجمالي</label>
        </div>
        <Table bordered  className='table div10'>
      {/* Render table headers */}
      <thead>
        <tr>
          <th>الاجمالي المالي</th>
          <th>عدد الوحدات</th>
          <th>القيمه الماليه للوحده</th>
          <th>المقاسات</th>
        </tr>
      </thead>

      {/* Render table body */}
      <tbody>
        {
        x.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, colIndex) => (
              <td key={`${rowIndex}-${colIndex}`}>{cell}</td>
            ))}
          </tr>
        ))
        }
      </tbody>
    </Table>
        <div className='my-input'>
            <div className='my-input-element'>
                <input ref={inputref} className='input1' placeholder='المقاسات' />
            </div>
            <div className='my-input-element'>
                <input ref={inputref1} className='input2' placeholder='القيمه الماليه للوحده' />
            </div>
            <div className='my-input-element'>
                <input ref={inputref2} className='input3' placeholder='عدد الوحدات' />
            </div>
            <button onClick={add}>اضافه</button>
            <button onClick={send}>طباعه</button>
            <button onClick={new_}>فاتوره جديده</button>
        </div>
      </div>
  )}

export default React.memo(Todo_list);