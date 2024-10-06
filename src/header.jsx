import React from "react";
import './App.css';
import pic from './sd-removebg-preview (2).png'
const Header = () =>{
    return (
        <header className="header">
             <div className="header-img">
                  <img src={pic} alt="" height='90px'/>
             </div>
             <div className="header-title">
                  <h1>Yassin for industry and trade</h1>
             </div>
        </header>
    )
}

export default React.memo(Header);