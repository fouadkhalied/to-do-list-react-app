







import './App.css';
import { useState , useEffect , useRef } from "react";
import React from "react";
import Table from 'react-bootstrap/Table';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Print from './print';
import { Button } from 'react-bootstrap';
const Todo_list = () => {
    const [x,setx] = useState(JSON.parse(localStorage.getItem('table')) || []);
    const [y,sety] = useState(JSON.parse(localStorage.getItem('total')) || 0);
    const cv = '❌';
    const edit = '✎';
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
      alert('المدخل غير صالح');
      return;
    }

    const newData = [result , value , edit ,  value1 , edit , value2 , edit , cv]
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
      sety(y-x[index][0]);
      new_x.splice(index,1);
      setx(new_x);
    }
    /////////////////////////////////////////////////////
    const toedit = (row,col,my)=>{
       const new_x = [...x];
       new_x[row][col] = my;
       setx(new_x);
    }
    //////////////////////////////////////////////////
    const recalculate = ()=>{
      let ertd = 0;
      for (let i = 0; i < x.length; i++) {
         ertd += x[i][0];
      }
      return ertd;
    }
    ///////////////////////////////////////////////////
    const toeditnum = (row,col,my) =>{
      const new_x = [...x];
      new_x[row][col] = my;
      //console.log(new_x[row][0] ,new_x[row][1] , new_x[row][3] , new_x[row][5]);
      new_x[row][0] = new_x[row][1] * new_x[row][3];
      setx(new_x);
      sety(recalculate);
    }
    ////////////////////////////////////////////////////
    // const toeditnum2 = (row,col,my) =>{
    //   const new_x = [...x];
    //   new_x[row][col] = my;
    //   setx(new_x);
    // }
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

        {/* //////////////////////////////////////////////////////// */}
        <div className='table-div'> 
        <Table bordered  className='table div10'>
      {/* Render table headers */}
      <thead>
        <tr>
          <th>الاجمالي المالي</th>
          <th>عدد الوحدات</th>
          <th style={{'width' : '4%'}}>تعديل</th>
          <th>القيمه الماليه للوحده</th>
          <th style={{'width' : '4%'}}>تعديل</th>
          <th>المقاسات</th>
          <th style={{'width' : '4%'}}>تعديل</th>
          <th style={{'width' : '4%'}}>الحذف</th>
        </tr>
      </thead>

      {/* Render table body */}
      <tbody>
        {
        x.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, colIndex) => (
              <td onClick={
                ()=>{
                  if(colIndex == 7) {
                    toDelete(rowIndex)
                  }
                  else if(colIndex == 6) {
                    const defs = prompt('المقاس المعدل');
                    if(defs == "")
                        alert("المدخل فارغ")
                    else  
                        toedit(rowIndex , colIndex - 1 , defs);
                  } 
                  else if(colIndex == 4) {
                    const defs = prompt('القيمه الماليه المعدله');
                    if(defs === "" || isNaN(defs) || defs === null)
                      alert("المدخل غير صالح")
                    else
                      toeditnum(rowIndex , colIndex - 1 , defs);
                  }
                  else if(colIndex == 2) {
                    const defs = prompt('عدد الوحدات المعدل');
                    if(defs === "" || isNaN(defs) || defs === null)
                      alert("المدخل غير صالح")
                    else
                      toeditnum(rowIndex , colIndex - 1 , defs);
                  }
                }
              } style={{'cursor' : colIndex == 7 || colIndex == 6 || colIndex == 4 || colIndex == 2 ? 'pointer' : ''}}>{cell}</td>
            ))}
          </tr>
        ))
        }
      </tbody>
    </Table>
    </div>
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
            <Button variant="outline-success success" onClick={add}>اضافه</Button>
            <Button variant="outline-danger" onClick={send}>طباعه</Button>
            <Button variant="outline-warning" onClick={new_}>فاتوره جديده</Button>
        </div>
      </div>
  )}

export default React.memo(Todo_list);