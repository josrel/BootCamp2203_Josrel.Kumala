import React, { useState, useEffect } from "react";
import ListThread from "./listThread";
import Button from "react-bootstrap/Button";

const Thread = (props) => {
  const [list, setList] = useState([]);

  // console.log(this.props.match.params.id)

  const getThread = async () => {
    try {
      console.log(props.match.params.id)
      const id = props.match.params.id
      const response = await fetch(`http://localhost:3001/thread/${id}`);
      const jsondata = await response.json();
      // console.log(jsondata);
      setList(jsondata);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getThread();
  }, []);
  return (
    <React.Fragment>
      <Button variant="link">
          <h2>halooo</h2>
      </Button>
      <ListThread list={list} />
    </React.Fragment>
  );
}

export default Thread
