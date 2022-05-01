import React, { useState } from "react";
import Button from "react-bootstrap/Button";

const DeleteThread = ({ list_thread, id_thread }) => {
  const [list, setList] = useState([list_thread]);

  async function handleRemove(id) {
    try {
      let data = [...list];
      console.log(id);
      let filteredData = data.filter((item) => item.id !== id);
      await fetch(`http://localhost:3001/thread/${id}`, {
        method: "DELETE",
      });
      setList(filteredData);
      window.location = `/thread/${id_thread}`
    } catch (error) {
      console.error(error.message);
    }
  }
  return (
    <div>
      <Button variant="danger" onClick={() => handleRemove(list_thread.id)}>
        Delete Post
      </Button>
    </div>
  );
};

export default DeleteThread;