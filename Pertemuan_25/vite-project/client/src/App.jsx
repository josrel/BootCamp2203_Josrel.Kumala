import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Table from "react-bootstrap/Table";
import AddList from "./component/addList";
import Button from "react-bootstrap/Button";
import EditList from "./component/editList";
import DelList from "./component/deleteList";
import DetailList from "./component/detailList";
import Card from "react-bootstrap/Card";
import List from "./component/allList";

function App() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [list, setList] = useState([]);

  const getContact = async () => {
    try {
      const response = await fetch("http://localhost:3001/contact");
      const jsondata = await response.json();
      setList(jsondata);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getContact();
  }, []);

  return (
    <React.Fragment>
      <AddList />
      <List contact={list}/>
    </React.Fragment>
  );
}

export default App;
