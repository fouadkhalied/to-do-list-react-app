import './App.css';
import { useState , useEffect , useRef } from "react";
import React from "react";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap'; 
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Customers = ()=>{
    const [x,setx] = useState(JSON.parse(localStorage.getItem('customers_table')) || []);
    const cv = '❌';
    const edit = '✎';
    const inputref = useRef();
    const inputref1 = useRef();
    const inputref2 = useRef();
    const inputref3 = useRef();
    const inputref4 = useRef();
    ///////////////////////////////////////////////////
    const add = ()=>{
    const value =  inputref.current.value;
    const value1 = inputref1.current.value;
    const value2 = inputref2.current.value;
    const value3 = inputref3.current.value;
    const value4 = inputref4.current.value;
    //console.log(value , value3);

    if (value=="") {
      alert('المدخل غير صالح');
      return;
    }

    const newData = [ value4 , edit , value3 , edit , value2 , edit ,  value1 , edit , value , edit , cv]
      setx([...x,newData]);
      // inputref.current.value = "";
      // inputref1.current.value = "";
      // inputref2.current.value = "";
      // inputref3.current.value = "";
      //console.log(x);
    }
    ///////////////////////////////////////////////////
    useEffect(() => {
        localStorage.setItem('customers_table',JSON.stringify(x) || []);
      }, [x]);
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
    const save = async ()=>{
       try {
          const response = await axios.post('/customers' , x);
          console.log(response);
          toast.success("success")
          
       } catch (ex) {
          console.log(ex);
       }
    }
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
          <th>اسم الشركه</th>
          <th style={{'width' : '4%'}}>تعديل</th>  
          <th>رقم التواصل 2</th>
          <th style={{'width' : '4%'}}>تعديل</th>  
          <th>رقم التواصل 1</th>
          <th style={{'width' : '4%'}}>تعديل</th>
          <th>العنوان</th>
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
                  if(colIndex == 10) {
                    toDelete(rowIndex)
                  }
                  else if(colIndex == 9) {
                    const defs = prompt('ألاسم المعدل');
                    if(defs == "")
                        alert("المدخل فارغ")
                    else  
                        toedit(rowIndex , colIndex - 1 , defs);
                  } 
                  else if(colIndex == 7) {
                    const defs = prompt('العنوان المعدل');
                    if(defs === "")
                      alert("المدخل غير صالح")
                    else
                      toedit(rowIndex , colIndex - 1 , defs);
                  }
                  else if(colIndex == 5) {
                    const defs = prompt('رقم التواصل المعدل');
                    if(defs === "")
                      alert("المدخل غير صالح")
                    else
                      toedit(rowIndex , colIndex - 1 , defs);
                  }
                  else if(colIndex == 3) {
                    const defs = prompt('رقم التواصل المعدل');
                    if(defs === "")
                      alert("المدخل غير صالح")
                    else
                      toedit(rowIndex , colIndex - 1 , defs);
                  }
                  else if(colIndex == 1) {
                    const defs = prompt('اسم الركه المعدل');
                    if(defs === "")
                      alert("المدخل غير صالح")
                    else
                      toedit(rowIndex , colIndex - 1 , defs);
                  }
                }
              } style={{'cursor' : colIndex == 10 || colIndex == 9 || colIndex == 7 || colIndex == 5 || colIndex == 3 || colIndex == 1 ? 'pointer' : ''}}>{cell}</td>
            ))}
          </tr>
        ))
        }
      </tbody>
    </Table>
    </div>
        <div className='my-input'>
            <div className='my-input-element'>
                <input ref={inputref} className='input1' placeholder='الأسم' />
            </div>
            <div className='my-input-element'>
                <input ref={inputref1} className='input2' placeholder='العنوان' />
            </div>
            <div className='my-input-element'>
                <input ref={inputref2} className='input3' placeholder='رقم التواصل 1' />
            </div>
            <div className='my-input-element'>
                <input ref={inputref3} className='input4' placeholder='رقم التواصل 2' />
            </div>
            <div className='my-input-element'>
                <input ref={inputref4} className='input5' placeholder='أسم الشركه' />
            </div>
            <Button variant="outline-success success" onClick={add}>اضافه</Button>
        </div>
        <Button variant="outline-success success" onClick={save}>حفظ</Button>
      </div>
  )
}
export default React.memo(Customers);