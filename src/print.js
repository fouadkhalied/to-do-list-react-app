
import { Table } from 'react-bootstrap';
import './App.css';
import ds from './sd.PNG'

import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';







const Print =()=>{
    const [x,setx] = useState(JSON.parse(localStorage.getItem('table')) || []);
    const [out,setout] = useState([]);
    // console.log(x);
    
    window.addEventListener('load' , ()=>{
        const len = 17 - x.length;
        const ele = [' ' , ' ' , ' ' , ' ' , ' ' , ' ' , ' '];
        if(len > 0) { 
        for (let i = 0; i < len; i++) {
            x.push(ele);
        }}
        const ce = () => {
          return x.map(row => {return row.filter((_, index) => index !== 2 && index !== 4 && index !== 6 && index !== 7)})
        }        
        console.log(x);
        console.log(len);
        setout(ce);
    })
    const [y,sety] = useState(JSON.parse(localStorage.getItem('total')) || 0);
    return (
        <>
            <div className='page-header'>
                 <div className='page-header-img'>
                   <img src={ds} width='200px' height='200px'/>
                 </div>
                 <div className='page-header-div'>
                    <h1>جرد القيمه الماليه للبضائع</h1>
                 </div>
                 <div className='page-header-sanf'>
                    <h1>/ الصنف</h1>
                 </div>
            </div>         

            <div className='table-113-120'>
            <Table bordered className='table-113'>
      <thead>
        <tr>
          <th style={{'width' : '25%'}}><p style={{'font-weight': '700','display': 'inline','font-size': '30px'}}>الاجمالي المالي</p></th>
          <th style={{'width' : '25%'}}><p style={{'font-weight': '700','display': 'inline','font-size': '30px'}}>عدد الوحدات</p></th>
          <th style={{'width' : '25%'}}><p style={{'font-weight': '700','display': 'inline','font-size': '30px'}}>القيمه الماليه للوحده</p></th>
          <th style={{'width' : '25%'}}><p style={{'font-weight': '700','display': 'inline','font-size': '30px'}}>المقاسات</p></th>
        </tr>
      </thead>
      <tbody>
        {out.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, colIndex) => (
              <td style={{'height': '60px'}}><p style={{'font-weight': '600','font-size': '30px'}}>{cell}</p></td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>      
            </div>

    <div class="kh">
        <div class="tarek">
           <p>الاجمالي</p>
           <p>{y}</p>
        </div>
        <div class="tarek">
        <p>التاريخ</p>
        <p>/ &nbsp; &nbsp;/</p>
       </div>
        <div class="entag">
          <p>الاعتماد</p>
          <p>م / حسام ابو الفتوح</p>
          <p>...............................</p>
       </div>
      </div>  
        </>
    )
}

export default Print;