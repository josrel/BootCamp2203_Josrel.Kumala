import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const EditComment = ({ list_comment,id_post }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [updateNama, setUpdateNama] = useState(list_comment.comment);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      console.log(list_comment.id);
      const body = { updateNama };
      const response = await fetch(`http://localhost:3001/comment/${list_comment.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(response);
      handleClose();
      window.location = `/post/${id_post}`;
    } catch (error) {
      console.error(error.massage);
    }
  };
  return (
    <div>
      <>
        <Button variant="primary" onClick={handleShow}>
          edit Post
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Edit Comment</Form.Label>
                <Form.Control
                  type="text"
                  value={updateNama}
                  onChange={(e) => setUpdateNama(e.target.value)}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                onClick={(e) => handleUpdate(e)}
              >
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    </div>
  );
};

export default EditComment;
