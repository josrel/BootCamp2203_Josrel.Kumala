import React, { useState } from 'react';
import Tambah from './tambah';


const Qty = ( ) => {
  const [Quantity, setquantity] = useState(0);

//   const tambah = () => {
//     // this.setState(tambah(0))
//     setquantity(Quantity + 1)
//   }

//   const hasil = Tambah(0)

//   const coba = myFantasticFunction()

//   const kurang = () => {
//     setquantity(Quantity - 1)
//   }

    return (
      <React.Fragment>
          {Tambah()}
      </React.Fragment>
    );
  }

export default Qty;