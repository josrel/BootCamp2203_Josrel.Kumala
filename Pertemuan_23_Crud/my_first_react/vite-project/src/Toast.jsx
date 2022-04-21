import React, { useState } from 'react';
import { Toast, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function Coba() {
    const [count, setCount] = useState(0)
  
    return (
                  <Toast>
                      <Toast.Header>
                          {/* <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" /> */}
                          <strong className="me-auto">Bootstrap</strong>
                          <small>11 mins ago</small>
                      </Toast.Header>
                      <Toast.Body>
                            <Button as="input" type="button" value="add" onClick={() => setCount((count) => count + 1)} />{' '}
                            <Button as="input" type="button" value="reduce" onClick={() => setCount((count) => count - 1)} />{' '}
                            <h2>Quantity {count}</h2>
                      </Toast.Body>
                      </Toast>
    )
  }

export default Coba