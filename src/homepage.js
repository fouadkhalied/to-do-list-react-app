
import React from 'react';
import './App.css'
import { Link } from 'react-router-dom';

const Home = ()=>{
     return (
        <div className='homepage grid-container'>
              <Link to='/todo_list'className='recipe'>
              <div >
                   <h1>
                    جرد
                   </h1>
              </div>
              </Link>
              <Link to='/reciep'className='recipe'>
              <div >
                   <h1>
                    فاتوره
                   </h1>
              </div>
              </Link>
              <Link to='/store'className='recipe'>
              <div>
                   <h1>
                    المخزن
                   </h1>
              </div>
              </Link>
              <Link to='/products'className='recipe'>
              <div>
                   <h1>
                    المنتجات
                   </h1>
              </div>
              </Link>
              <Link to='/customers'className='recipe'>
              <div >
                   <h1>
                    العملاء
                   </h1>
              </div>
              </Link>
              <Link to='/orders'className='recipe'>
              <div >
                   <h1>
                    طلبات
                   </h1>
              </div>
              </Link>
              <Link to='/products_costs'className='recipe'>
              <div >
                   <h1>
                    تكاليف الوحدات
                   </h1>
              </div>
              </Link>
              <Link to='/products_details'className='recipe'>
              <div >
                   <h1>
                    بيانات الأفيز
                   </h1>
              </div>
              </Link>
        </div>
     )
}
export default React.memo(Home);