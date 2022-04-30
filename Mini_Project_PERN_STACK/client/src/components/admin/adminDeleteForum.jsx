import React, { useState } from "react";
import Button from "react-bootstrap/Button";

const DeleteList = ({ forum }) => {
  const [list, setList] = useState([forum]);

  async function handleRemove(id) {
    try {
      let data = [...list];
      console.log(id);
      let filteredData = data.filter((forum) => forum.id !== id);
      await fetch(`http://localhost:3001/forum/${id}`, {
        method: "DELETE",
      });
      setList(filteredData);
      window.location = "/dashboard";
    } catch (error) {
      console.error(error.message);
    }
  }
  return (
    <div>
      <Button variant="danger" onClick={() => handleRemove(forum.id)}>
        {forum.id}
      </Button>
    </div>
  );
};

export default DeleteList;
