import React, { useState, useEffect } from "react";
import ListThread from "./listThread";
import Button from "react-bootstrap/Button";
import Dashboard from "./Dashboard";
import Navigasi from "./Nav";
import AddThread from "../components/AddThread"

const Thread = (props) => {
  const [list, setList] = useState([]);

  const [name, setName] = useState("");
  async function getName() {
    try {
      const response = await fetch("http://localhost:3001/dashboard/", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();

      setName(parseRes.user_name);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getName();
  }, []);
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
      <Navigasi />
      <AddThread name={name} id={props.match.params.id}/>
      <ListThread list={list} id_thread={props.match.params.id} name={name}/>
    </React.Fragment>
  );
}

export default Thread
