import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import AdminEdit from "./adminEditForum";
import Badge from "react-bootstrap/Badge";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Comment from "../comment";

export default function Forum({ forum }) {
  const [list, setList] = useState([forum]);
  const [show, setShow] = useState(false);
  const [showReply, setShowReply] = useState(false);

  async function handleRemove(id) {
    try {
      let data = [...list];
      console.log(id);
      let filteredData = data.filter((forum) => forum.id !== id);
      await fetch(`http://localhost:3001/forum/${id}`, {
        method: "DELETE",
      });
      setList(filteredData);
      window.location = "/dashboard";
    } catch (error) {
      console.error(error.message);
    }
  }

  const AdminForum = forum.map((list) => {
    return (
      <React.Fragment>
        
        <Card>
          <Card.Header>
            {/* <h2>{"../../../../server/public" + list.image}</h2> */}
            <img
              style={{ width: "300px" }}
              src={"http://localhost:3001/" + list.image}
              alt=""
            />
            <h2>{list.judul_forum}</h2>
          </Card.Header>
          <Card.Body>
            <blockquote className="blockquote mb-0">
              <p>{list.des_forum}</p>
              <footer className="blockquote-footer">
                {list.jam} <cite title="Source Title">{list.creator}</cite>
              </footer>
            </blockquote>
            <div className="button-admin">
              <Card.Link>
                <Button variant="danger" onClick={() => handleRemove(list.id)}>
                  {list.id}
                </Button>
              </Card.Link>
              <Card.Link>
                <AdminEdit forum={list} />
              </Card.Link>
            </div>
          </Card.Body>
        </Card>
      </React.Fragment>
    );
  });

  return (
    <div>
      {AdminForum}
    </div>
  );
}
