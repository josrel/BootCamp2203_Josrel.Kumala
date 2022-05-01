import React, { useState, useEffect,Fragment } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const AddThread = ({name,id}) => {
    const [showAdd, setShowAdd] = useState(false);

    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    const [judul_thread, setjudul_forum] = useState([]);
    const [des_thread, setdes_forum] = useState([]);

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
          const body = { judul_thread, des_thread, name,id };
          const response = await fetch("http://localhost:3001/thread", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });
    
          console.log(body);
          console.log(response);
          handleCloseAdd();
          window.location=`/thread/${id}`
        //   handleShowUpload();
        } catch (error) {
          console.error(error.message);
        }
      };

    return(
        <Fragment>
                  <>
        <Button variant="primary" onClick={handleShowAdd}>
          Ask Question
        </Button>

        <Modal show={showAdd} onHide={handleCloseAdd}>
          <Modal.Header closeButton>
            <Modal.Title>Tambah Forum</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleAdd}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Judul Thread</Form.Label>
                <Form.Control
                  type="text"
                  value={judul_thread}
                  onChange={(e) => setjudul_forum(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Deskripsi Forum</Form.Label>
                <Form.Control
                  type="text"
                  value={des_thread}
                  onChange={(e) => setdes_forum(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" onClick={(e) => handleAdd(e)}>
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
      <></>
        </Fragment>
    )
}
export default AddThread