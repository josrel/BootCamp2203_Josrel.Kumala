import React, { useState, useEffect, Fragment } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import Navigasi from "./Nav";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import gambar from "./image/user.png";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

const UserSetting = () => {
  const [user, setUser] = useState([]);
  const [role, setRole] = useState();
  const [updateRole, setUpdateRole] = useState();
  const getUserData = async () => {
    try {
      const response = await fetch("http://localhost:3001/usersetting");
      const jsondata = await response.json();
      setUser(jsondata);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      console.log(role);
      const body = { updateRole};
      const response = await fetch(`http://localhost:3001/thread`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(response);
    } catch (error) {
      console.error(error.massage);
    }
  };
  

  return (
    <Fragment>
      <Navigasi />
      <h1>User Data :</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>

        {user.map((list) => (
          <tbody>
            <tr>
              <td>
                {!list.image ? (
                  <img
                    style={{
                      height: "35px",
                      width: "35px",
                      borderRadius: "50%",
                    }}
                    src={gambar}
                  />
                ) : (
                  <img
                    style={{
                      height: "35px",
                      width: "35px",
                      borderRadius: "50%",
                    }}
                    src={"http://localhost:3001/" + list.image}
                  />
                )}{" "}
                {list.user_name}
              </td>
              <td>{list.user_email}</td>
              <td>{list.role}</td>
              <td>
                {list.role === "superadmin" ? (
                  ""
                ) : (
                //   <Dropdown>
                //     <Dropdown.Toggle
                //       variant="success"
                //       id="dropdown-basic"
                //     ></Dropdown.Toggle>
                //     <Dropdown.Menu>
                //       <Dropdown.Item href={"#/action-2" + list.user_name}>
                //         user
                //       </Dropdown.Item>
                //       <Dropdown.Item href={"#/action-1" + list.user_name} >
                //         admin
                //       </Dropdown.Item>
                //     </Dropdown.Menu>
                //   </Dropdown>
                <select value={role} onChange={e=>setRole(e.value)}>
                    <option value="">admin</option>
                    <option value="">user</option>
                </select>
                )}
              </td>
            </tr>
          </tbody>
        ))}
      </Table>
    </Fragment>
  );
};

export default UserSetting;
