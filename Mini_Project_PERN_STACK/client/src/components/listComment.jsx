import React, { useState,Fragment } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import DeleteComment from "./deleteComment";
import gambar from "./image/user.png";
import {FaGithubAlt} from "react-icons/fa"
import {FaFortAwesome} from "react-icons/fa"

const AllComment = ({ list_comment, id_post, name, role }) => {
  const [show, setShow] = useState(true);
  // const [image, setImage] = useState("https://fakeimg.pl/350x250/");

  const AllComment = list_comment.map((list) => {
    return (
      <Fragment>
        {show ? (
          <Card>
            <Card.Header>
            {!list.image ? (
                <img
                alt=""
                  style={{ height: "35px", width: "35px", borderRadius: "50%" }}
                  src={gambar}
                />
              ) : (
              <img
              alt=""
                style={{ height: "35px", width: "35px", borderRadius: "50%" }}
                src={"http://localhost:3001/" + list.image}
              />
              )}
              {" "}
              {list.user_name}{" "}
              {list.role === "admin" ?  <FaGithubAlt /> : list.role === "superadmin" ?<FaFortAwesome /> : " "}
            </Card.Header>
            <Card.Body>
              <blockquote className="blockquote mb-0">
                <p> {list.comment} </p>
                <footer className="blockquote-footer">{list.jam_comment}</footer>
              </blockquote>
              {list.user_comment === name || role !== "user" ? (
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
        <Badge bg="primary">Hide Comment({list_comment.length})</Badge>
      </Button>
      {AllComment}
    </Fragment>
  );
};

export default AllComment;
