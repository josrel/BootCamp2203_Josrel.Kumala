import React, { Fragment, useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Forum from "./Forum";
import AdminForum from "./admin/adminForum";
import AddForum from "./AddForum";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    window.location.assign("/login");
  };

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

  const [list, setList] = useState([]);

  const getForum = async () => {
    try {
      const response = await fetch("http://localhost:3001/forum");
      const jsondata = await response.json();
      console.log(jsondata)
      setList(jsondata);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getForum();
  }, []);

  return (
    <Fragment>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Bootcamp Mini Project</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Nav.Link>Hello {name} !</Nav.Link>
              <Nav.Link onClick={(e) => logout(e)}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <h1>Forum List</h1>
      <AddForum name={name} />
      {name == "1" ? (
        <AdminForum forum={list} name={name} />
      ) : (
        <Forum list_forum={list} name={name}/>
      )}
    </Fragment>
  );
};

export default Dashboard;