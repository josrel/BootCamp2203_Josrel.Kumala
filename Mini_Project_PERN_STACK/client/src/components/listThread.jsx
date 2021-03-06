import React from "react";
import Card from "react-bootstrap/Card";
import DeleteThread from "./admin/adminDeleteThread";

export default function ListThread({ list, id_thread,name, role }) {
  const AllList = list.map((list) => {
    return (
      <div>
        <Card>
          <Card.Header>
            <h2 onClick={() => window.location=(`/post/${list.id}`)}>{list.judul_thread}</h2>
          </Card.Header>
          <Card.Body>
            <blockquote className="blockquote mb-0">
              <p> {list.des_thread} </p>
              <footer className="blockquote-footer">
                {list.jam} <cite title="Source Title">posted by {list.creator}</cite>
              </footer>
            </blockquote>
            <Card.Link>
              {list.creator === name || role !=="user" ? (
                <DeleteThread list_thread={list} id_thread={id_thread} />
              ): (" ")}
            </Card.Link>
          </Card.Body>
        </Card>
      </div>
    );
  });
  return <div>{AllList}</div>;
}
