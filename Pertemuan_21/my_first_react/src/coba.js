import React, { Component } from "react";

class Clock extends React.Component {
    constructor(props) {
      super(props);
      this.state = {date: new Date()};
    }
  
    componentDidMount() {
      this.timerID = setInterval(
        () => this.tick(),
        1000
      );
    }
  
    tick() {
      this.setState({
        date: new Date()
      });
    }
  
    render() {
      return (
          <React.Fragment>
            <header className='navbar'>
                    <div className='navbar__title navbar__item'><h1>Bootcamp batch 1 : experiment with reactjs </h1></div>
                    <div className='navbar__item'>Home</div>
                    <div className='navbar__item'>About</div>
                    <div className='navbar__item'>Contact</div>
                    <div className='navbar__item'>{this.state.date.toLocaleTimeString()}</div>
            </header>
          </React.Fragment>
      );
    }
  }

export default Clock;