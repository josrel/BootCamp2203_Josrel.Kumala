import React, { Fragment, useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Forum from "./Forum";
import AdminForum from "./admin/adminForum";
import AddForum from "./AddForum";

const Navigasi = ({ setAuth }) => {
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

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    window.location.assign("/login");
  };
  return (
    <Fragment>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Bootcamp Mini Project</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Nav.Link>Hello {name}  !</Nav.Link>
              <Nav.Link onClick={(e) => logout(e)}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Fragment>
  );
};
export default Navigasi;
