







import './App.css';
import { useState , useEffect , useRef } from "react";
import React from "react";
import Table from 'react-bootstrap/Table';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
const Reciepe = () => {
    const [x,setx] = useState(JSON.parse(localStorage.getItem('reciep_table')) || []);
    const [y,sety] = useState(JSON.parse(localStorage.getItem('reciep_total')) || 0);
    const [z,setz] = useState(JSON.parse(localStorage.getItem('reciep_profit')) || 0);
    const sc = window.indexedDB.open("My testdatabase" , 3);
    const cv = '❌';
    const edit = '✎';
    const inputref = useRef();
    const inputref1 = useRef();
    const inputref2 = useRef();
    const inputref3 = useRef();
    ///////////////////////////////////////////////////
    const add = ()=>{
    const value = inputref2.current.value;
    const value1 = inputref1.current.value;
    const value2 = inputref.current.value;
    const value3 = inputref3.current.value;

    const result = value1 * value;
    const final = result - (value * value3);
    //console.log(value , value3);

    if (value=="" || value1 == "" || value2 == "" || value3 == "") {
      alert('المدخل غير صالح');
      return;
    }

    const newData = [ final , value3 , edit , result , value , edit ,  value1 , edit , value2 , edit , cv]
      setx([...x,newData]);
      // inputref.current.value = "";
      // inputref1.current.value = "";
      // inputref2.current.value = "";
      // inputref3.current.value = "";
      sety(y + result);
      setz(z + final);
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
    //////////////////////////////////////////////////
    const recalculate = ()=>{
      let ertd = 0;
      for (let i = 0; i < x.length; i++) {
         ertd += x[i][3];
      }
      return ertd;
    }
    ///////////////////////////////////////////////////
    const recalculate2 = ()=>{
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
      new_x[row][3] = new_x[row][4] * new_x[row][6];

      new_x[row][0] = new_x[row][3] - (new_x[row][1] * new_x[row][4]);
      sety(recalculate);
      setz(recalculate2);
      
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
        <div className='head'>
          <div className='sub-head'>
          {z}
          <label>اجمالي هامش الربح</label>
          </div>
          <div className='sub-head'>
          {y}
          <label>الاجمالي المالي الكلي</label>
          </div>
        </div>

        {/* //////////////////////////////////////////////////////// */}
        <div className='table-div'> 
        <Table bordered  className='table div10'>
      {/* Render table headers */}
      <thead>
        <tr>
          <th>هامش الربح</th>
          <th>سعر الشراء</th>
          <th style={{'width' : '4%'}}>تعديل</th>
          <th>الاجمالي المالي</th>
          <th>عدد الوحدات</th>
          <th style={{'width' : '4%'}}>تعديل</th>
          <th>سعر البيع</th>
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
                  if(colIndex == 10) {
                    toDelete(rowIndex)
                  }
                  else if(colIndex == 9) {
                    const defs = prompt('المقاس المعدل');
                    if(defs == "")
                        alert("المدخل فارغ")
                    else  
                        toedit(rowIndex , colIndex - 1 , defs);
                  } 
                  else if(colIndex == 7) {
                    const defs = prompt('القيمه الماليه المعدله');
                    if(defs === "" || isNaN(defs) || defs === null)
                      alert("المدخل غير صالح")
                    else
                      toeditnum(rowIndex , colIndex - 1 , defs);
                  }
                  else if(colIndex == 5) {
                    const defs = prompt('عدد الوحدات المعدل');
                    if(defs === "" || isNaN(defs) || defs === null)
                      alert("المدخل غير صالح")
                    else
                      toeditnum(rowIndex , colIndex - 1 , defs);
                  }
                  else if(colIndex == 2) {
                    const defs = prompt('سعر الشراء المعدل');
                    if(defs === "" || isNaN(defs) || defs === null)
                      alert("المدخل غير صالح");
                    else
                      toeditnum(rowIndex , colIndex - 1 , defs);
                  }
                }
              } style={{'cursor' : colIndex == 10 || colIndex == 9 || colIndex == 7 || colIndex == 5 || colIndex == 2 ? 'pointer' : ''}}>{cell}</td>
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
                <input ref={inputref1} className='input2' placeholder='سعر البيع' />
            </div>
            <div className='my-input-element'>
                <input ref={inputref2} className='input3' placeholder='عدد الوحدات' />
            </div>
            <div className='my-input-element'>
                <input ref={inputref3} className='input4' placeholder= 'سعر الشراء' />
            </div>
            <Button variant="outline-success success" onClick={add}>اضافه</Button>
        </div>
        <div className='my-input2'>
            <Button variant="outline-danger" onClick={send}>طباعه</Button>
            <Button variant="outline-warning" onClick={new_}>فاتوره جديده</Button>
            <Button variant="outline-info" onClick={save}>حفظ</Button>
        </div>
      </div>
  )}

export default React.memo(Reciepe);