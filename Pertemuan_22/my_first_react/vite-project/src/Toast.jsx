import React, { useState } from 'react';
import { Toast, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

// const Coba = () => {
//     return(
//         <react.Fragment>
//             <Toast>
//                 <Toast.Header>
//                     <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
//                     <strong className="me-auto">Bootstrap</strong>
//                     <small>11 mins ago</small>
//                 </Toast.Header>
//                 <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
//                 </Toast>
//         </react.Fragment>
//     )
// }

function Coba() {
    const [count, setCount] = useState(0)
  
    return (
        //   <p>

        //   </p>
                //   <react.Fragment>
                  <Toast>
                      <Toast.Header>
                          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                          <strong className="me-auto">Bootstrap</strong>
                          <small>11 mins ago</small>
                      </Toast.Header>
                      <Toast.Body>
                            <Button as="input" type="button" value="add" onClick={() => setCount((count) => count + 1)} />{' '}
                            <Button as="input" type="button" value="reduce" onClick={() => setCount((count) => count - 1)} />{' '}
                            <h2>Quantity {count}</h2>
                      </Toast.Body>
                      </Toast>
            //   </react.Fragment>
    )
  }

export default Coba