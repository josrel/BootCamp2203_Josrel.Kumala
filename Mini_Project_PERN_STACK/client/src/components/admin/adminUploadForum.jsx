import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";

const EditList = ({ forum }) => {
    const [showUpload, setShowUpload] = useState(false);
    const handleCloseUpload = () => setShowUpload(false);
    const handleShowUpload = () => setShowUpload(true);
    const [image, setImage] = useState("https://fakeimg.pl/350x250/");
    const [saveImage, setSaveImage] = useState(null);

    function handleUploadChange(e) {
        console.log(e.target.files[0]);
        console.log(forum.id)
        let uploaded = e.target.files[0];
        console.log(URL.createObjectURL(uploaded));
        setImage(URL.createObjectURL(uploaded));
        setSaveImage(uploaded);
      }

      const uploadImage = async e => {
        e.preventDefault()
        try {
          if (!saveImage) {
            alert("upload gambar dulu");
          } else {
            let formData = new FormData();
            formData.append("photo", saveImage);
            await fetch(`http://localhost:3001/forumUpload/${forum.id}`, {
              method: "POST",
              body: formData,
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.status === "success") {
                  window.location = "/dashboard";
                }
              });
          }
        } catch (error) {
          console.error(error.message);
        }
      };

  return (
    <div>
      <>
        <Button variant="primary" onClick={handleShowUpload}>
          Upload Image
        </Button>

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
    </div>
  );
};

export default EditList;
