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
  const AllForum = list_forum.map((list) => {
    return (
      <React.Fragment>
        <Card>
          <Card.Img variant="top" style={{height:400}} src={"http://localhost:3001/" + list.image} />
          <Card.Body>
            <Card.Header>
              <h2 onClick={() => (window.location = `/thread/${list.id}`)}>
                {list.judul_forum}
              </h2>
            </Card.Header>
            <Card.Body>
              <blockquote className="blockquote mb-0">
                <p>{list.des_forum}</p>
                <footer className="blockquote-footer">
                  {list.jam}{" "}
                  <cite title="Source Title">oleh {list.creator}</cite>
                </footer>
              </blockquote>
            </Card.Body>
          </Card.Body>
        </Card>
        <br />
      </React.Fragment>
    );
  });
  return (
    <div>
      {AllForum}
    </div>
  );
}
