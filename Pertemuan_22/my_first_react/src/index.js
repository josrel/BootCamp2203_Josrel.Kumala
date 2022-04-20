import react from "react";
import reactDom from "react-dom";
import './index.css';
import MainContent from './mainContent'
import Nav from './nav'
import Clock from './coba'
import Qty from './quantity'

// const element = 
// <h1>This is react</h1>
// reactDom.render(element, document.getElementById("root"))

function renderDOM(content, id){
    reactDom.render(content, document.getElementById(id))
}

const coba = 
<header className='navbar'>
        <div className='navbar__title navbar__item'><h1>Bootcamp batch 1 : experiment with reactjs </h1></div>
        <div className='navbar__item'>Home</div>
        <div className='navbar__item'>About</div>
        <div className='navbar__item'>Contact</div>        
    </header>

renderDOM(<MainContent/>, "root")
// renderDOM(<Nav/>, "nav")
renderDOM(<Clock/>, "jam")
renderDOM(<Qty/>, "quantity")
// reactDom.render(coba, document.getElementById("roots"))