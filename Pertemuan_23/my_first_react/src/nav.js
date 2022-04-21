import react from "react";

const nav = () => {
    return(
        <react.Fragment>
            <header className='navbar'>
                    <div className='navbar__title navbar__item'><h1>Bootcamp batch 1 : experiment with reactjs </h1></div>
                    <div className='navbar__item'>Home</div>
                    <div className='navbar__item'>About</div>
                    <div className='navbar__item'>Contact</div>        
            </header>
        </react.Fragment>
    )
}


    export default nav