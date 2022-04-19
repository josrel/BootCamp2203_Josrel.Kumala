import React, { Component } from 'react';

class qty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicks: 0,
      show: true
    };
  }

  IncrementItem = () => {
    this.setState({ clicks: this.state.clicks + 1 });
  }
  DecreaseItem = () => {
    this.setState({ clicks: this.state.clicks - 1 });
  }
  ToggleClick = () => {
    this.setState({ show: !this.state.show });
  }

  render() {
    return (
      <div>
        <button onClick={this.IncrementItem}>add</button>
        {/* <button onClick={this.DecreaseItem}>Click to decrease by 1</button> */}
        {/* <button onClick={this.ToggleClick}>
          { this.state.show ? 'Hide number' : 'Show number' }
        </button> */}
        { this.state.show ? <h2>Quantity : { this.state.clicks }</h2> : '' }
      </div>
    );
  }
}

export default qty;