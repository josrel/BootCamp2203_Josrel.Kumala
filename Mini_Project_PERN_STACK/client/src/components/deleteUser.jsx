import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Badge from 'react-bootstrap/Badge'

const DeleteUser = ({ user }) => {
  const [list, setList] = useState([user]);

  async function handleRemove(id) {
    try {
        console.log(id)
      let data = [...list];
      let filteredData = data.filter((item) => item.id !== id);
      await fetch(`http://localhost:3001/usersetting/${id}`, {
        method: "DELETE",
      });
      setList(filteredData);
      window.location = `/usersetting`;
    } catch (error) {
      console.error(error.message);
    }
  }
  return (
    <div>
      <Button variant="link" onClick={() => handleRemove(user.user_id)}>
      <Badge bg="danger">
            delete
          </Badge>{" "}
      </Button>
    </div>
  );
};

export default DeleteUser;