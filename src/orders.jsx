import './App.css';
import { useState , useEffect , useRef } from "react";
import React from "react";
import Table from 'react-bootstrap/Table';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import Spreadsheet from 'react-spreadsheet';
import XLSX from 'xlsx'

const Orders = ()=>{

    const [x,setx] = useState(JSON.parse(localStorage.getItem('reciep_table')) || []);
    const [y,sety] = useState(JSON.parse(localStorage.getItem('reciep_total')) || 0);
    const [z,setz] = useState(JSON.parse(localStorage.getItem('reciep_profit')) || 0);
    const cv = '❌';
    const edit = '✎';
    const inputref = useRef();
    const inputref1 = useRef();
    const inputref2 = useRef();
    ///////////////////////////////////////////////////
    const add = ()=>{
    const value = inputref.current.value;
    const value1 = inputref1.current.value;
    const value2 = inputref2.current.value;
    //console.log(value , value3);

    if (value=="" || value1 == "" || value2 == "") {
      alert('المدخل غير صالح');
      return;
    }

    const newData = [value2 , edit ,  value1 , edit , value , edit , cv]
      setx([...x,newData]);
      // inputref.current.value = "";
      // inputref1.current.value = "";
      // inputref2.current.value = "";
      // inputref3.current.value = "";
      console.log(x);
    }
    ///////////////////////////////////////////////////
    useEffect(() => {
        localStorage.setItem('reciep_table',JSON.stringify(x) || []);
        localStorage.setItem('reciep_total',JSON.stringify(y) || 0);
        localStorage.setItem('reciep_profit',JSON.stringify (z)|| 0);
      }, [x]);
    ///////////////////////////////////////////////////
    const send = (par) =>{
       window.location = '/print'
    }
    //////////////////////////////////////////////////
    const new_ = () =>{
       localStorage.setItem('reciep_table' , JSON.stringify([]));
       localStorage.setItem('reciep_total' , JSON.stringify(0));
       localStorage.setItem('reciep_profit' , JSON.stringify(0));
       setx([]);
       sety(0);
       setz(0);
    }
    //////////////////////////////////////////////////
    const toDelete =(index)=>{
      const new_x = [...x];
      sety(y-x[index][3]);
      setz(z-x[index][0]);
      //console.log(x[index][3]);
      new_x.splice(index,1);
      setx(new_x);
    }
    /////////////////////////////////////////////////////
    const toedit = (row,col,my)=>{
       const new_x = [...x];
       new_x[row][col] = my;
       setx(new_x);
    }
    ////////////////////////////////////////////////////
    const save = ()=>{
        window.location = '/data';     
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
        <div className='orders-head'>
          <div className='orders-sub-head1'>
              <div><input type="text" /><h4>: م.ض</h4></div>
              <div><input type="text" /><h4>: رقم التسجيل</h4></div>
              <div><input type="text" /><h4>: س.ت</h4></div>
          </div>
          <div className='orders-sub-head2'>
          <input type='text'/>
          <h4>المطلوب من السيد</h4>
          </div>
        </div>

        {/* //////////////////////////////////////////////////////// */}
        <div className='table-div'> 
        <Table bordered  className='table div10'>
      {/* Render table headers */}
      <thead>
        <tr>
          <th>اللون</th>
          <th style={{'width' : '4%'}}>تعديل</th>
          <th>الكميه</th>
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
                  if(colIndex == 6) {
                    toDelete(rowIndex)
                  }
                  else if(colIndex == 5) {
                    const defs = prompt('المقاس المعدل');
                    if(defs == "")
                        alert("المدخل فارغ")
                    else  
                        toedit(rowIndex , colIndex - 1 , defs);
                  } 
                  else if(colIndex == 3) {
                    const defs = prompt('الكميه المعدله');
                    if(defs === "" || isNaN(defs) || defs === null)
                      alert("المدخل غير صالح")
                    else
                      toedit(rowIndex , colIndex - 1 , defs);
                  }
                  else if(colIndex == 1) {
                    const defs = prompt('اللون المعدل');
                    if(defs === "")
                      alert("المدخل غير صالح")
                    else
                      toedit(rowIndex , colIndex - 1 , defs);
                  }
                }
              } style={{'cursor' : colIndex == 6 || colIndex == 5 || colIndex == 3 || colIndex == 1 ? 'pointer' : ''}}>{cell}</td>
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
                <input ref={inputref1} className='input2' placeholder='الكميه' />
            </div>
            <div className='my-input-element'>
                <input ref={inputref2} className='input3' placeholder='اللون' />
            </div>
            <Button variant="outline-success success" onClick={add}>اضافه</Button>
        </div>
        <div className='my-input2'>
            <Button variant="outline-danger" onClick={send}>طباعه</Button>
            <Button variant="outline-warning" onClick={new_}>فاتوره جديده</Button>
            <Button variant="outline-info" onClick={save}>حفظ</Button>
        </div>
      </div>
  )
}
export default React.memo(Orders);