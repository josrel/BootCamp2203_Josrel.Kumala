import React, { useState,useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const AddList = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState([]);
  const [email, setEmail] = useState([]);
  const [telp, setTelp] = useState([]);

  function handleNameChange (e){
      setName(e.target.value)
  }

  const handleAdd = async e => {
    e.preventDefault()
    try {
      const body = { name, telp, email };
      const response = await fetch("http://localhost:3001/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      console.log(body);
      console.log(response);
      handleClose()
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(()=> {
      handleAdd()
  },[])

  return (
    <React.Fragment>
      <>
        <Button variant="primary" onClick={handleShow}>
          Add Contact
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleAdd}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>nama</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>email</Form.Label>
                <Form.Control
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>email</Form.Label>
                <Form.Control
                  type="text"
                  value={telp}
                  onChange={(e) => setTelp(e.target.value)}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                onClick={(e) => handleAdd(e)}
              >
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    </React.Fragment>
  );
};

export default AddList;
