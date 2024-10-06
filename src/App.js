import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import './App.css';
import Tode_list from './todo'
import Print from './print';
import 'bootstrap/dist/css/bootstrap.min.css';
import Reciepe from './reciepe';
import Homepage from './homepage';
import Header from './header';
import Orders from './orders';
import Product from './products';
import Customers from './customers';
import Store from './store';
import Product_costs from './product_costs';
import Product_details from './product_details';
const Todo = () => {
    return (
      <> 
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/products_details' element={<Product_details/>}/>
        <Route path='/products_costs' element={<Product_costs/>}/>
        <Route path='/products' element={<Product/>}/>
        <Route path='/customers' element={<Customers/>}/>
        <Route path='/store' element={<Store/>}/>
        <Route path='/orders' element={<Orders/>}/>
        <Route path='/reciep' element={<Reciepe/>}/>
        <Route path='/todo_list' element={<Tode_list/>}/>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/print' element={<Print/>}/>
      </Routes>
      </BrowserRouter>
      </>
  )}

export default React.memo(Todo);