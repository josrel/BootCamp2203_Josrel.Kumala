import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { uid } from "uid";
import axios from "axios";
import { Alert } from "react-bootstrap";

export default function List({ data, handleRemove, handleEdit, handleDetail}) {
  const Biodata = data.map((contact) => {
    return (
      <div>
        <Card
          style={{
            width: "18rem",
            float: "left",
            marginRight: "10px",
            marginTop: "10px",
          }}
        >
          <Card.Body>
            <Card.Title>
              {contact.name}
              <hr />
            </Card.Title>
            <Card.Text>
              <Button variant="danger" onClick={() => handleRemove(contact.id)}>
                delete
              </Button>{" "}
              <Button variant="primary" onClick={() => handleEdit(contact.id)}>
                edit
              </Button>{" "}
              <Button
                variant="success"
                onClick={() => handleDetail(contact.id)}
              >
                Detail
              </Button>{" "}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  });
  return <div>{Biodata}</div>;
}
