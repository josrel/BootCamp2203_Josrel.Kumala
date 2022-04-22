import { useState, useEffect } from "react";
import logo from "./logo.svg";
import List from "./textList";
import Card from "react-bootstrap/Card";
import "./App.css";
import { uid } from "uid";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import ModalDialog from "react-bootstrap/ModalDialog";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalBody from "react-bootstrap/ModalBody";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function App() {
  //show modal add
  const [showAdd, setShowAdd] = useState(false);

  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);

  //show modal detail
  const [showDetail, setShowDetail] = useState(false);

  const handleCloseDetail = () => setShowDetail(false);
  const handleShowDetail = () => setShowDetail(true);

  //show modal edit
  const [showEdit, setShowEdit] = useState(false);

  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  const [contacts, setContacts] = useState([]);

  const [isUpdate, setIsUpdate] = useState({ id: null, status: false });

  const [formData, setFormData] = useState({
    name: "",
    telp: "",
    email: "",
  });

  const [detailData, setDetailData] = useState({
    name: "",
    telp: "",
    email: "",
  });

  useEffect(() => {
    //ambil data dari json
    axios.get("http://localhost:3000/contacts").then((res) => {
      console.log(res.data);
      //fungsi ? kalo misalnya ga ada data ato undefined maka akan ngereturn array kosong
      setContacts(res?.data ?? []);
    });
  }, []);

  //biar bisa ngetik di si inputnya kalo value doang ga bisa ngetik lagi
  function handleChange(e) {
    let data = { ...formData };
    data[e.target.name] = e.target.value;
    setFormData(data);
  }

  function handleAdd(e) {
    e.preventDefault();
    let data = [...contacts];

    if (formData.name === "") {
      return false;
    }
    if (formData.telp === "") {
      return false;
    }
    if (formData.email === "") {
      return false;
    }

    if (isUpdate.status) {
      data.forEach((contact) => {
        if (contact.id === isUpdate.id) {
          contact.name = formData.name;
          contact.telp = formData.telp;
          contact.email = formData.email;
        }
      });

      axios
        .put(`http://localhost:3000/contacts/${isUpdate.id}`, {
          name: formData.name,
          telp: formData.telp,
          email: formData.email,
        })
        .then((res) => {
          setShowEdit(false);
        });
    } else {
      let newData = {
        id: uid(),
        name: formData.name,
        telp: formData.telp,
        email: formData.email,
      };
      data.push(newData);
      setShowAdd(false);

      axios.post("http://localhost:3000/contacts", newData).then((res) => {
        alert("Berhasil Menyimpan Data");
      });
    }
    //nambah kontak
    setIsUpdate({ id: null, status: false });
    setContacts(data);
    setFormData({ name: "", telp: "", email: "" });
  }

  function handleEdit(id) {
    let data = [...contacts];
    setShowEdit(true);
    let foundData = data.find((contact) => contact.id === id);
    setFormData({
      name: foundData.name,
      telp: foundData.telp,
      email: foundData.email,
    });
    setIsUpdate({ id: id, status: true });
  }
  function handleDetail(id) {
    let data = [...contacts];
    setShowDetail(true);
    let foundData = data.find((contact) => contact.id === id);
    setDetailData({
      name: foundData.name,
      telp: foundData.telp,
      email: foundData.email,
    });
  }

  function handleRemove(id) {
    let data = [...contacts];
    let filteredData = data.filter((contact) => contact.id !== id);

    axios.delete(`http://localhost:3000/contacts/${id}`).then((res) => {
      alert("berhasil menghapus data");
    });
    setContacts(filteredData);
  }

  return (
    <div className="App">
      {/* //modal add data */}
      <>
        <Button variant="primary" onClick={handleShowAdd}>
          Add Data
        </Button>
        <Modal show={showAdd} onHide={handleCloseAdd}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleAdd}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Nama</Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  onChange={handleChange}
                  value={formData.name}
                  name="name"
                  autoFocus
                />
                <Form.Label>Mobile</Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  onChange={handleChange}
                  value={formData.telp}
                  name="telp"
                  autoFocus
                />
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  onChange={handleChange}
                  value={formData.email}
                  name="email"
                  autoFocus
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={handleAdd}
              type="submit"
              className="btn btn-primary w-100 mt-3"
            >
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </>

      {/* //modal show detail */}
      <>
        <Modal show={showDetail} onHide={handleCloseDetail}>
          <Modal.Header closeButton>
            <Modal.Title>Profle {detailData.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleAdd}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Nama : {detailData.name}</Form.Label>
                <br></br>
                <Form.Label>Mobile : {detailData.telp}</Form.Label>
                <br></br>
                <Form.Label>Email : {detailData.email}</Form.Label>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={handleCloseDetail}
              type="submit"
              className="btn btn-primary w-100 mt-3"
            >
              close
            </Button>
          </Modal.Footer>
        </Modal>
      </>

      {/* //modal show edit */}
      <>
        <Modal show={showEdit} onHide={handleCloseEdit}>
          <Modal.Header closeButton>
            <Modal.Title>Edit {formData.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleAdd}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Nama</Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  onChange={handleChange}
                  value={formData.name}
                  name="name"
                  autoFocus
                />
                <Form.Label>Mobile</Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  onChange={handleChange}
                  value={formData.telp}
                  name="telp"
                  autoFocus
                />
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  onChange={handleChange}
                  value={formData.email}
                  name="email"
                  autoFocus
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={handleAdd}
              type="submit"
              className="btn btn-primary w-100 mt-3"
            >
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      <List
        handleRemove={handleRemove}
        handleEdit={handleEdit}
        handleDetail={handleDetail}
        data={contacts}
      />
    </div>
  );
}
export default App;
