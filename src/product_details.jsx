import './App.css';
import { useState , useEffect , useRef } from "react";
import React from "react";
import Table from 'react-bootstrap/Table';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import Spreadsheet from 'react-spreadsheet';
import XLSX from 'xlsx'

const Product_cost = () =>{
    const [x,setx] = useState(JSON.parse(localStorage.getItem('product_details_table')) || []);
    const cv = '❌';
    const edit = '✎';
    const inputref = useRef();
    const inputref1 = useRef();
    const inputref2 = useRef();
    const inputref3 = useRef();
    const inputref4 = useRef();
    const inputref5 = useRef();
    const inputref6 = useRef();
    ///////////////////////////////////////////////////
    const add = ()=>{
    const value = inputref.current.value;
    const value1 = inputref1.current.value;
    const value2 = inputref2.current.value;
    const value3 = inputref3.current.value;
    const value4 = inputref4.current.value;
    const value5 = inputref5.current.value;
    const value6 = inputref6.current.value;
    //console.log(value , value3);

    if (value=="") {
      alert('المدخل غير صالح');
      return;
    }

    const newData = [ value6 , edit ,value5 , edit ,value4 , edit , value3 , edit , value2 , edit ,  value1 , edit , value , edit , cv]
      setx([...x,newData]);
      // inputref.current.value = "";
      // inputref1.current.value = "";
      // inputref2.current.value = "";
      // inputref3.current.value = "";
      console.log(x);
    }
    ///////////////////////////////////////////////////
    useEffect(() => {
        localStorage.setItem('product_details_table',JSON.stringify(x) || []);
      }, [x]);
    ///////////////////////////////////////////////////
    const send = (par) =>{
       window.location = '/print'
    }
    //////////////////////////////////////////////////
    const new_ = () =>{
       localStorage.setItem('product_details_table' , JSON.stringify([]));
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
          <th>وزن الافيز بالجرام</th>
          <th style={{'width' : '4%'}}>تعديل</th>  
          <th>العدد داخل الكرتونه</th>
          <th style={{'width' : '4%'}}>تعديل</th>  
          <th>وزن الكرتونه بالكيلو</th>
          <th style={{'width' : '4%'}}>تعديل</th>  
          <th>وزن الكيس الفارغ</th>
          <th style={{'width' : '4%'}}>تعديل</th>  
          <th>وزن الافيز بالكيلو</th>
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
                  if(colIndex == 14) {
                    toDelete(rowIndex)
                  }
                  else if(colIndex == 13) {
                    const defs = prompt('ألاسم المعدل');
                    if(defs === "" || defs === null)
                        alert("المدخل فارغ")
                    else  
                        toedit(rowIndex , colIndex - 1 , defs);
                  } 
                  else if(colIndex == 11) {
                    const defs = prompt('المقاس المعدل');
                    if(defs === "" || defs === null)
                      alert("المدخل غير صالح")
                    else
                      toedit(rowIndex , colIndex - 1 , defs);
                  }
                  else if(colIndex == 9) {
                    const defs = prompt('وزن الافيز بالكيلو المعدل');
                    if(defs === "" || defs === null)
                      alert("المدخل غير صالح")
                    else
                      toedit(rowIndex , colIndex - 1 , defs);
                  }
                  else if(colIndex == 7) {
                    const defs = prompt('وزن الكيس الفارغ المعدل');
                    if(defs === "" || defs === null)
                      alert("المدخل غير صالح")
                    else
                      toedit(rowIndex , colIndex - 1 , defs);
                  }
                  else if(colIndex == 5) {
                    const defs = prompt('وزن الكرتونه المعدل');
                    if(defs === "" || defs === null)
                      alert("المدخل غير صالح")
                    else
                      toedit(rowIndex , colIndex - 1 , defs);
                  }
                  else if(colIndex == 3) {
                    const defs = prompt('العدد داخل الكرتونه المعدل');
                    if(defs === "" || defs === null)
                      alert("المدخل غير صالح")
                    else
                      toedit(rowIndex , colIndex - 1 , defs);
                  }
                  else if(colIndex == 1) {
                    const defs = prompt('وزن الافيز المعدل');
                    if(defs === "" || defs === null)
                      alert("المدخل غير صالح")
                    else
                      toedit(rowIndex , colIndex - 1 , defs);
                  }
                }
              } style={{'cursor' : colIndex == 14 ||colIndex == 13 || colIndex == 11 || colIndex == 9 || colIndex == 7 || colIndex == 5 || colIndex == 3 || colIndex == 1 ? 'pointer' : ''}}>{cell}</td>
            ))}
          </tr>
        ))
        }
      </tbody>
    </Table>
    </div>
        <div className='my-input_product_costs'>
            <div className='my-input-element'>
                <input ref={inputref} className='input1' placeholder='الأسم' />
            </div>
            <div className='my-input-element'>
                <input ref={inputref1} className='input2' placeholder='المقاس' />
            </div>
            <div className='my-input-element'>
                <input ref={inputref2} className='input3' placeholder='وزن الافيز بالكيلو' />
            </div>
            <div className='my-input-element'>
                <input ref={inputref3} className='input4' placeholder='وزن الكيس الفارغ'/>
            </div>
            <div className='my-input-element'>
                <input ref={inputref4} className='input5' placeholder='وزن الكرتونه' />
            </div>
            <div className='my-input-element'>
                <input ref={inputref5} className='input5' placeholder='العدد داخل الكرتونه' />
            </div>
            <div className='my-input-element'>
                <input ref={inputref6} className='input5' placeholder='وزن الافيز بالجرام' />
            </div>
            <Button variant="outline-success success" onClick={add}>اضافه</Button>
        </div>
        
      </div>
  )
}

export default React.memo(Product_cost);