import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";

export default function ListThread({list}){
    const AllList = list.map((list) => {
        return(
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
                <Card.Title>{list.judul_thread}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Card Subtitle
                </Card.Subtitle>
                <Card.Text>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        )
    })
    return <div>{AllList}</div>;
}