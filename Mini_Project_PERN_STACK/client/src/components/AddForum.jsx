import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const AddList = ({ name }) => {
  const [showAdd, setShowAdd] = useState(false);

  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);

  const [showUpload, setShowUpload] = useState(false);

  const handleCloseUpload = () => setShowUpload(false);
  const handleShowUpload = () => setShowUpload(true);

  const [image, setImage] = useState("https://fakeimg.pl/350x250/");
  const [saveImage, setSaveImage] = useState(null);

  function handleUploadChange(e) {
    console.log(e.target.files[0]);
    let uploaded = e.target.files[0];
    console.log(URL.createObjectURL(uploaded));
    setImage(URL.createObjectURL(uploaded));
    setSaveImage(uploaded);
  }

  const [judul_forum, setjudul_forum] = useState([]);
  const [des_forum, setdes_forum] = useState([]);
  const [creator, setcreator] = useState([]);

  function handleForumChange(e) {
    setjudul_forum(e.target.value);
  }

  const uploadImage = async (e) => {
    try {
      if (!saveImage) {
        alert("upload gambar dulu");
      } else {
        
        let formData = new FormData()
        formData.append("photo",saveImage)
        const response = await fetch("http://localhost:3001/forumUpload", {
          method: "POST",
          body: formData
        }).then((res) => res.json())
        .then((data) => {
            if(data.status === "success"){
                window.location="/dashboard"
            }
        })
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const body = { judul_forum, des_forum, name };
      const response = await fetch("http://localhost:3001/forum", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      console.log(body);
      console.log(response);
      handleCloseAdd();
      window.location="/dashboard"
    //   handleShowUpload();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <React.Fragment>
      <>
        <Button variant="primary" onClick={handleShowAdd}>
          Add Forum
        </Button>

        <Modal show={showAdd} onHide={handleCloseAdd}>
          <Modal.Header closeButton>
            <Modal.Title>Tambah Forum</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleAdd}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Judul Forum</Form.Label>
                <Form.Control
                  type="text"
                  value={judul_forum}
                  onChange={(e) => handleForumChange(e)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Deskripsi Forum</Form.Label>
                <Form.Control
                  type="text"
                  value={des_forum}
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
      <>
        <Modal show={showUpload} onHide={handleCloseUpload}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <img src={image} className="img-thumbnail" alt="" />
            </div>
            <div className="my-3">
              <label htmlFor="formFile" className="form-label">
                Upload Image
              </label>
              <input
                type="file"
                className="form-control"
                id="formFile"
                onChange={handleUploadChange}
                accept="image/*"
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={(e) => uploadImage(e)}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </React.Fragment>
  );
};

export default AddList;
