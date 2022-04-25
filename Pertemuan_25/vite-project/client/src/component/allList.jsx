import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import DelList from "./deleteList";
import EditList from "./editList";
import DetailList from "./detailList";

export default function List({ contact }) {
  const AllList = contact.map((list) => {
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
            <Card.Title>{list.nama}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Card Subtitle
            </Card.Subtitle>
            <Card.Text>
              <DelList contact={list} />
              <EditList contact={contact} />
              <DetailList contact={contact} />
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  });
  return <div>{AllList}</div>;
}
