import React, { useState } from 'react';

// const tambah = function() {
//     this.setState({ tampung: this.state.tampung + 1 });
//   }

export default function Tambah() {
    const [qty, setquantity] = useState(0);
    const add = () => {
        setquantity(qty + 1)
      }
        const minus = () => {
            setquantity(qty - 1)
          }

      return (
          <React.Fragment>
              <button onClick={add}>add</button>
              <button onClick={minus}>kurang</button>
              <h2>Quantity : {qty}</h2>
          </React.Fragment>
      )
  }