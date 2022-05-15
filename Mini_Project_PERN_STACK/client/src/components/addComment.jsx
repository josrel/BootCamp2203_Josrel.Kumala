import React, { useState, useEffect, Fragment } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import FloatingLabel from "react-bootstrap/FloatingLabel";

const AddComment = ({id_post}) => {
  const [show, setShow] = useState(false);
  const [comment, setComment] = useState([]);

  const [name, setName] = useState("");
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

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const body = { comment, name, id_post };
      console.log(body)
      const response = await fetch("http://localhost:3001/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      console.log(body);
      console.log(response);
      window.location = `/post/${id_post}`;
      //   handleShowUpload();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Fragment>
      <Button variant="link" onClick={() => setShow(!show)}>
        <Badge bg="danger">Comment</Badge>
      </Button>
      {show ? (
        <>
          <FloatingLabel controlId="floatingTextarea2" label="Comments">
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: "100px" }}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button variant="primary" onClick={(e) => handleAdd(e)}>
              Submit
            </Button>
          </FloatingLabel>
        </>
      ) : null}
    </Fragment>
  );
};

export default AddComment;
