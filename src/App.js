import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import './App.css';
import Tode_list from './todo'
import Print from './print';
import 'bootstrap/dist/css/bootstrap.min.css';
const Todo = () => {
    return (
      <> 
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Tode_list/>}/>
        <Route path='/print' element={<Print/>}/>
      </Routes>
      </BrowserRouter>
      </>
  )}

export default React.memo(Todo);