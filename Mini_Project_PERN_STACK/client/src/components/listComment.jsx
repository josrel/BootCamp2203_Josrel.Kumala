import React, { useState, useEffect, Fragment } from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import DeleteComment from "./deleteComment";
import EditComment from "./editComment";

const AllComment = ({ list_comment, id_post, name }) => {
  const [show, setShow] = useState(false);

  const AllComment = list_comment.map((list) => {
    return (
      <Fragment>
        {show ? (
          <Card>
            <Card.Body>
              <blockquote className="blockquote mb-0">
                <p> {list.comment}</p>
                <footer className="blockquote-footer">
                  {list.jam_comment}{" "}
                  <cite title="Source Title">{list.user_comment}</cite>
                </footer>
              </blockquote>
              {list.user_comment == name ? (
                <>
                  <DeleteComment list_comment={list} id_post={id_post} />
                  {/* <EditComment list_comment={list} id_post={id_post} /> */}
                </>
              ) : (
                " "
              )}
            </Card.Body>
          </Card>
        ) : null}
      </Fragment>
    );
  });

  return (
    <Fragment>
      <Button variant="link" onClick={() => setShow(!show)}>
        <Badge bg="primary">All Comment({list_comment.length})</Badge>
      </Button>
      {AllComment}
    </Fragment>
  );
};

export default AllComment;
