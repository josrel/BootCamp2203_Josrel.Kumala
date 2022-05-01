import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import AdminEdit from "./adminEditForum";
import AdminUpload from "./adminUploadForum";
import Badge from "react-bootstrap/Badge";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Comment from "../comment";
import Modal from "react-bootstrap/Modal";
import AdminDelete from "./adminDeleteForum";
import Thread from "../Thread";
import AddForum from "../AddForum";

export default function Forum({ forum, name }) {
  const AdminForum = forum.map((list) => {
    return (
      <React.Fragment>
        {/* <h2>{"../../../../server/public" + list.image}</h2> */}
        <Card>
          <Card.Img variant="top" src={"http://localhost:3001/" + list.image} />
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
              <div className="button-admin">
                <Card.Link>
                  <AdminDelete forum={list} />
                </Card.Link>
                <Card.Link>
                  <AdminEdit forum={list} />
                </Card.Link>
                <Card.Link>
                  <AdminUpload forum={list} />
                </Card.Link>
              </div>
            </Card.Body>
          </Card.Body>
        </Card>
      </React.Fragment>
    );
  });

  return (
    <div>
      <AddForum name={name} />
      {AdminForum}
    </div>
  );
}
