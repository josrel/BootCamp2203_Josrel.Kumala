import react from "react";
import reactDom from "react-dom";
import './index.css';

const element = <h1>This is react</h1>
reactDom.render(element, document.getElementById("root"))

const coba = (
<header className='navbar'>
        <div className='navbar__title navbar__item'><h3>Bootcamp batch 1 : experiment with reactjs </h3></div>
        <div className='navbar__item'>Home</div>
        <div className='navbar__item'>About</div>
        <div className='navbar__item'>Contact</div>        
    </header>
)
reactDom.render(coba, document.getElementById("roots"))