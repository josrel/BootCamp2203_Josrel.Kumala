import React, { useState } from "react";
import Button from "react-bootstrap/Button";

const DeleteComment = ({ list_comment,id_post }) => {
  const [list, setList] = useState([list_comment]);

  async function handleRemove(id) {
    try {
      let data = [...list];
      console.log(id);
      let filteredData = data.filter((item) => item.id !== id);
      await fetch(`http://localhost:3001/comment/${id}`, {
        method: "DELETE",
      });
      setList(filteredData);
      window.location = `/post/${id_post}`;
    } catch (error) {
      console.error(error.message);
    }
  }
  return (
    <div>
      <Button variant="danger" onClick={() => handleRemove(list_comment.comment)}>
        Delete Post
      </Button>
    </div>
  );
};

export default DeleteComment;