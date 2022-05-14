import React, { useState, useEffect, Fragment } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import Navigasi from "./Nav";
import Modal from "react-bootstrap/Modal";
import {
  Box,
  // Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@mui/material";

import {
  Avatar,
  CardActions,
  Typography
} from '@mui/material';

const EditProfile = () => {
  const [name, setName] = useState("");
  const [updateNama, setUpdateNama] = useState();

  const [showUpload, setShowUpload] = useState(false);
  const handleCloseUpload = () => setShowUpload(false);
  const handleShowUpload = () => setShowUpload(true);
  const [image, setImage] = useState("https://fakeimg.pl/350x250/");
  const [saveImage, setSaveImage] = useState(null);


  const [list, setList] = useState([]);

  const getForum = async () => {
    try {
      const response = await fetch(`http://localhost:3001/users/${name}`);
      const jsondata = await response.json();
      console.log(jsondata)
      setList(jsondata);
      console.log(list)
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getForum();
  }, []);

  async function getName() {
    try {
      const response = await fetch("http://localhost:3001/dashboard/", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();

      setName(parseRes.user_name);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getName();
  }, []);
  const user = {
    avatar: '/static/images/avatars/avatar_6.png',
    city: 'Los Angeles',
    country: 'USA',
    jobTitle: 'Senior Developer',
    name: 'Katarina Smith',
    timezone: 'GTM-7'
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const body = { updateNama };
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
        const response = await fetch(
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
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={updateNama}
            placeholder={list.user_name}
            onChange={(e) => setUpdateNama(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Re-Enter Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => handleUpdate(e)}
        >
          Submit
        </Button>
      </Form>
      <br />
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
    </Fragment>
  );
};

export default EditProfile;
