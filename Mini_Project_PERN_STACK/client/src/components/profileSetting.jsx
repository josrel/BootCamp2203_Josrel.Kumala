import React, { useState, useEffect, Fragment } from "react";
import Form from "react-bootstrap/Form";
import Navigasi from "./Nav";
import Modal from "react-bootstrap/Modal";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const EditProfile = () => {
  const [name, setName] = useState("");
  const [userImage, setUserImage] = useState("");
  const [updateNama, setUpdateNama] = useState();
  const [updateDepan, setUpdateDepan] = useState();
  const [updateBelakang, setUpdateBelakang] = useState();
  const [updateNomor, setUpdateNomor] = useState();

  const [showUpload, setShowUpload] = useState(false);
  const handleCloseUpload = () => setShowUpload(false);
  const handleShowUpload = () => setShowUpload(true);
  const [image, setImage] = useState("https://fakeimg.pl/350x250/");
  const [saveImage, setSaveImage] = useState(null);

  const [list, setList] = useState([]);

  const getUser = async () => {
    try {
      const response = await fetch(`http://localhost:3001/users/${name}`);
      const jsondata = await response.json();
      console.log(jsondata);
      setList(jsondata);
      console.log(list);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  async function getName() {
    try {
      const response = await fetch("http://localhost:3001/dashboard/", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();

      setName(parseRes.user_name);
      setUpdateNama(parseRes.user_name)
      setUserImage(parseRes.image);
      setUpdateDepan(parseRes.first_name);
      setUpdateBelakang(parseRes.last_name);
      setUpdateNomor(parseRes.phone)
      console.log(userImage);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getName();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const body = { updateNama,updateDepan,updateBelakang,updateNomor };
      const response = await fetch(`http://localhost:3001/profile/${name}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(response);
      window.location = "/dashboard";
    } catch (error) {
      console.error(error.massage);
    }
  };

  function handleUploadChange(e) {
    console.log(e.target.files[0]);
    let uploaded = e.target.files[0];
    console.log(URL.createObjectURL(uploaded));
    setImage(URL.createObjectURL(uploaded));
    setSaveImage(uploaded);
  }

  const uploadImage = async (e) => {
    e.preventDefault();
    try {
      if (!saveImage) {
        alert("upload gambar dulu");
      } else {
        let formData = new FormData();
        formData.append("photo", saveImage);
        await fetch(
          `http://localhost:3001/profilepicture/${name}`,
          {
            method: "POST",
            body: formData,
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.status === "success") {
              window.location = `/dashboard`;
            }
          });
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <Fragment>
      <Navigasi />
      <h1>edit profile {name}</h1>
      <br />
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
      <Grid container spacing={3}>
        <Grid item xs>
          <Box p={5}>
            <Card>
              <Avatar
                src={"http://localhost:3001/" + userImage}
                sx={{ width: 250, height: 250, margin: "auto", marginTop: 2 }}
              />
              <CardContent>
                <Typography variant="h5" textAlign={"center"}>
                  {name}
                </Typography>
              </CardContent>
              <hr></hr>
              <Button
                color="secondary"
                variant="text"
                textAlign={"center"}
                fullWidth
                sx={{ marginBottom: 2 }}
                onClick={handleShowUpload}
              >
                Upload Profile Picture
              </Button>
            </Card>
          </Box>
        </Grid>
        <Grid item xs={7} mt={5}>
          <Box>
            <Card>
              <CardContent>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={updateNama}
                      onChange={(e) => setUpdateNama(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={updateDepan}
                      onChange={(e) => setUpdateDepan(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={updateBelakang}
                      onChange={(e) => setUpdateBelakang(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="text"
                      value={updateNomor}
                      onChange={(e) => setUpdateNomor(e.target.value)}
                    />
                  </Form.Group>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={(e) => handleUpdate(e)}
                    type="submit"
                    sx={{ float: "right", marginBottom: 3, marginTop: 3 }}
                  >
                    Save Profile
                  </Button>
                </Form>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default EditProfile;
