import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";

export default function Comment() {
  const [list, setList] = useState([]);

  const getComment = async () => {
    try {
      const response = await fetch("http://localhost:3001/comment");
      const jsondata = await response.json();
      console.log(jsondata);
      setList(jsondata);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getComment();
  }, []);

  const UserComment = list.map((list) => {
    return (
      <React.Fragment>
        <Card>
          <Card.Body>
            <blockquote className="blockquote mb-0">
              <p>{list.comment}</p>
              <footer className="blockquote-footer">
                <cite title="Source Title">{list.user_comment}</cite>
              </footer>
            </blockquote>
          </Card.Body>
        </Card>
      </React.Fragment>
    );
  });

  return <div>{UserComment}</div>;
}
