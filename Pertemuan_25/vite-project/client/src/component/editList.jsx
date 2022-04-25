import react, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const EditList = ({contact}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [updateNama, setUpdateNama] = useState(contact.nama)
  const [updateTelp, setUpdateTelp] = useState(contact.telp)
  const [updateEmail, setUpdateEmail] = useState(contact.email)

  const handleUpdate = async e => {
      e.preventDefault()
    try {
        const body = {updateNama}
        const response = await fetch(`http://localhost:3001/contact/${contact.id}`,
        {
            method:"PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        })
        console.log(response)
    } catch (error) {
        console.error(error.massage)
    }
  }
  return (
    <div>
      <>
        <Button variant="primary" onClick={handleShow}>
          edit
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
                  onChange={e => setUpdateNama(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>email</Form.Label>
                <Form.Control
                  type="text"
                  value={updateEmail}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>email</Form.Label>
                <Form.Control
                  type="text"
                  value={updateTelp}
                />
              </Form.Group>
              <Button variant="primary" type="submit"
              onClick={e => handleUpdate(e)}>
                Submit
              </Button>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
};

export default EditList;
