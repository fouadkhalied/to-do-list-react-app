import './App.css';
import { useState , useEffect , useRef } from "react";
import React from "react";
import Table from 'react-bootstrap/Table';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import Spreadsheet from 'react-spreadsheet';
import XLSX from 'xlsx'

const Store = ()=>{

    const [x,setx] = useState(JSON.parse(localStorage.getItem('store_table')) || []);
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
        localStorage.setItem('store_table',JSON.stringify(x) || []);
      }, [x]);
    ///////////////////////////////////////////////////
    const send = (par) =>{
       window.location = '/print'
    }
    //////////////////////////////////////////////////
    const new_ = () =>{
       localStorage.setItem('store_table' , JSON.stringify([]));
    }
    //////////////////////////////////////////////////
    const toDelete =(index)=>{
      const new_x = [...x];
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

        {/* //////////////////////////////////////////////////////// */}
        <div className='table-div'> 
        <Table bordered  className='table div10'>
      {/* Render table headers */}
      <thead>
        <tr> 
          <th>الكميه</th>
          <th style={{'width' : '4%'}}>تعديل</th>
          <th>المقاس</th>
          <th style={{'width' : '4%'}}>تعديل</th>
          <th>الاسم</th>
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
                    const defs = prompt('الاسم المعدل');
                    if(defs == "")
                        alert("المدخل فارغ")
                    else  
                        toedit(rowIndex , colIndex - 1 , defs);
                  } 
                  else if(colIndex == 3) {
                    const defs = prompt('المقاس المعدل');
                    if(defs === "")
                      alert("المدخل غير صالح")
                    else
                      toedit(rowIndex , colIndex - 1 , defs);
                  }
                  else if(colIndex == 1) {
                    const defs = prompt('الكميه');
                    if(defs === "" || isNaN(defs) || defs === null)
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
                <input ref={inputref} className='input1' placeholder='اسم المنتج' />
            </div>
            <div className='my-input-element'>
                <input ref={inputref1} className='input2' placeholder='المقاس' />
            </div>
            <div className='my-input-element'>
                <input ref={inputref2} className='input3' placeholder='الكميه' />
            </div>
            <Button variant="outline-success success" onClick={add}>اضافه</Button>
        </div>
        
      </div>
  )
}
export default React.memo(Store);