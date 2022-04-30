import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { BrowserRouter, Switch, Route, Redirect, Link } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Thread from "./Thread";
import Comment from "./comment";

export default function Forum({ list_forum, name }) {
  const [show, setShow] = useState(false);
  const [showReply, setShowReply] = useState(false);

  const [comment, setComment] = useState([]);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const body = { comment, name };
      const response = await fetch("http://localhost:3001/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      console.log(body);
      console.log(response);
      window.location = "/dashboard";
      //   handleShowUpload();
    } catch (error) {
      console.error(error.message);
    }
  };

  const AllForum = list_forum.map((list) => {
    return (
        <React.Fragment>
          <>
            <Card>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Header>
                  <Link to={"/thread/"+list.id}>
                    <h2>{list.judul_forum}</h2>
                  </Link>
                  <a href={"/thread/" + list.id}><h2>{list.judul_forum}</h2></a>
                </Card.Header>
                <Card.Body>
                  <blockquote className="blockquote mb-0">
                    <p>{list.des_forum}</p>
                    <footer className="blockquote-footer">
                      jam terakhir{" "}
                      <cite title="Source Title">{list.creator}</cite>
                    </footer>
                  </blockquote>
                </Card.Body>
              </Card.Body>
            </Card>
            <br />
          </>
          <Button variant="link">
            <Badge bg="primary" onClick={() => setShow(!show)}>
              See All Comment
            </Badge>
          </Button>
          <Button variant="link">
            <Badge bg="danger" onClick={() => setShowReply(!showReply)}>
              Comment
            </Badge>
          </Button>
        </React.Fragment>
    );
  });

  return (
    <div>
      {AllForum}
      {show ? <Comment /> : null}
      {showReply ? (
        <>
          <FloatingLabel controlId="floatingTextarea2" label="Comments">
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: "100px" }}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </FloatingLabel>
          <Button variant="link" onClick={(e) => handleAdd(e)}>
            <Badge bg="primary">Post</Badge>
          </Button>
        </>
      ) : null}
    </div>
  );
}
