import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import DeleteThread from "./admin/adminDeleteThread";
import EditList from "./uploadPost";
import EditPost from "./editPost";

export default function ListPost({ list, id_thread, name }) {
  const AllList = list.map((list) => {
    return (
      <div>
        <>
          <Card>
            <Card.Header>
              <h2>{list.judul_thread}</h2>
            </Card.Header>
            <Card.Body>
              <blockquote className="blockquote mb-0">
                <p> {list.des_thread} </p>
                <footer className="blockquote-footer">
                  {list.jam}{" "}
                  <cite title="Source Title">oleh {list.creator}</cite>
                </footer>
              </blockquote>
              {list.image && (
                <Card.Img
                  variant="bottom"
                  style={{ width: "500px", marginBottom: 10 }}
                  src={"http://localhost:3001/" + list.image}
                />
              )}

              <div className="button-admin">
                {list.creator == name ? (
                  <>
                <Card.Link>
                  <DeleteThread list_thread={list} id_thread={id_thread} />
                </Card.Link>
                <Card.Link>
                  <EditList list_thread={list} id_thread={id_thread} />
                </Card.Link>
                <Card.Link>
                  <EditPost list_thread={list} id_thread={id_thread} />
                </Card.Link>
                  </>
                ) : ("")}
              </div>
            </Card.Body>
          </Card>
        </>
      </div>
    );
  });
  return <div>{AllList}</div>;
}
