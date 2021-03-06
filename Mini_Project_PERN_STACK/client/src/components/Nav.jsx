import React, { Fragment, useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import gambar from "./image/user.png";
import { FaFortAwesome } from "react-icons/fa";
import { FaGithubAlt } from "react-icons/fa";

const Navigasi = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [role, setRole] = useState("");

  async function getName() {
    try {
      const response = await fetch("http://localhost:3001/dashboard/", {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const parseRes = await response.json();
      setName(parseRes.user_name);
      setImage(parseRes.image);
      setRole(parseRes.role);
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
  const home = (e) => {
    e.preventDefault();
    window.location.assign("/dashboard");
  };
  return (
    <Fragment>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand onClick={(e) => home(e)}>
            {" "}
            Bootcamp Mini Project
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Nav.Link>Hello {name}</Nav.Link>
                <Nav.Link>
                  {role === "admin" ? (
                    <FaGithubAlt />
                  ) : role === "superadmin" ? (
                    <FaFortAwesome />
                  ) : (
                    " "
                  )}
                </Nav.Link>
              {!image ? (
                <img
                alt=""
                  style={{ height: "35px", width: "35px", borderRadius: "50%" }}
                  src={gambar}
                />
              ) : (
                <img
                alt=""
                  style={{ height: "35px", width: "35px", borderRadius: "50%" }}
                  src={"http://localhost:3001/" + image}
                />
              )}
            </Nav>
            <Nav>
              <NavDropdown
                id="nav-dropdown-dark-example"
                title="Setting"
                menuVariant="dark"
              >
                <NavDropdown.Item href={"profile/" + name}>
                  Profile Setting
                </NavDropdown.Item>
                {role === "admin" || role === "superadmin" ? (
                <NavDropdown.Item href={"usersetting"}>
                  User Setting
                </NavDropdown.Item>
                  ): (
                    " "
                  )}
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  <Nav.Link onClick={(e) => logout(e)}>Logout</Nav.Link>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Fragment>
  );
};
export default Navigasi;
