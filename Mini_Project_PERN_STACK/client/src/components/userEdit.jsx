import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { FaGithub } from "react-icons/fa";
import Badge from 'react-bootstrap/Badge'
import { FaGithubAlt } from "react-icons/fa";

const EditUser = ({ user }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [updateNama, setUpdateNama] = useState(user.user_name);
  const [updateRole, setUpdateRole] = useState(user.role);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      console.log(updateRole);
      const body = { updateNama, updateRole };
      const response = await fetch(
        `http://localhost:3001/usersetting/${user.user_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      console.log(response);
      handleClose();
      window.location = "/usersetting";
    } catch (error) {
      console.error(error.massage);
    }
  };
  return (
    <div>
      <>
        <Button variant="link" onClick={handleShow}>
          <Badge bg="primary">
            edit
          </Badge>{" "}
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>nama</Form.Label>
                <Form.Control
                  type="text"
                  value={updateNama}
                  onChange={(e) => setUpdateNama(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Role :</Form.Label>
                <Form.Select
                  id="roles"
                  value={updateRole}
                  onChange={(e) => setUpdateRole(e.target.value)}
                >
                  <option>Choose Role</option>
                  <option value="admin">admin</option>
                  <option value="user">user</option>
                </Form.Select>
                {/* <Form.Label>selected : {updateRole}</Form.Label> */}
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

export default EditUser;
