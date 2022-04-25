import react, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const DetailList = ({contact}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [detailNama, setUpdateNama] = useState(contact.nama)
  const [detailTelp, setUpdateTelp] = useState(contact.telp)
  const [detailEmail, setUpdateEmail] = useState(contact.email)

  return (
    <div>
      <>
        <Button variant="primary" onClick={handleShow}>
          detail
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Detail {detailNama}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>nama : {detailNama}</Form.Label>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>email : {detailEmail}</Form.Label>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>telp : {detailTelp}</Form.Label>
              </Form.Group>
              <Button variant="primary" type="submit"
              onClick={handleClose}>
                Close
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    </div>
  );
};

export default DetailList;
