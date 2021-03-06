import React, { useState, useEffect, Fragment } from "react";
import Navigasi from "./Nav";
import Table from "react-bootstrap/Table";
import gambar from "./image/user.png";
import EditUser from "./userEdit";
import { FaGithubAlt } from "react-icons/fa";
import { FaFortAwesome } from "react-icons/fa";
import DeleteUser from "./deleteUser";

const UserSetting = () => {
  const [user, setUser] = useState([]);
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
                    alt=""
                    style={{
                      height: "35px",
                      width: "35px",
                      borderRadius: "50%",
                    }}
                    src={gambar}
                  />
                ) : (
                  <img
                    alt=""
                    style={{
                      height: "35px",
                      width: "35px",
                      borderRadius: "50%",
                    }}
                    src={"http://localhost:3001/" + list.image}
                  />
                )}{" "}
                {list.user_name}{" "}
                {list.role === "admin" ? (
                  <FaGithubAlt />
                ) : list.role === "superadmin" ? (
                  <FaFortAwesome />
                ) : (
                  " "
                )}
              </td>
              <td>{list.user_email}</td>
              <td>{list.role}</td>
              <td style={{ display: "flex" }}>
                {list.role === "superadmin" ? "" : <EditUser user={list} />}
                {list.role === "superadmin" ? "" : <DeleteUser user={list} />}
              </td>
            </tr>
          </tbody>
        ))}
      </Table>
    </Fragment>
  );
};

export default UserSetting;
