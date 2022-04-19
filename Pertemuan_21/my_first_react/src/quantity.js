import React, { Component } from 'react';

class qty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tampung: 0
    };
  }

  tambah = () => {
    this.setState({ tampung: this.state.tampung + 1 });
  }
  kurang = () => {
    this.setState({ tampung: this.state.tampung - 1 });
  }

  render() {
    return (
      <React.Fragment>
          <button onClick={this.tambah}>tambah</button>
          <button onClick={this.kurang}>kurang</button>
          <h2>Quantity : { this.state.tampung }</h2>
      </React.Fragment>
    );
  }
}

export default qty;