import React, { Fragment, useState, useEffect } from "react";
import Forum from "./Forum";
import AdminForum from "./admin/adminForum";
import Navigasi from "./Nav"

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  async function getName() {
    try {
      const response = await fetch("http://localhost:3001/dashboard/", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();

      setName(parseRes.user_name);
      setRole(parseRes.role)
      console.log(role)
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
      <Navigasi setAuth={setAuth}/>
      <h1>Forum List</h1>
      {role !== "user" ? (
        <AdminForum forum={list} name={name} />
      ) : (
        <Forum list_forum={list} name={name}/>
      )}
    </Fragment>
  );
};

export default Dashboard;
