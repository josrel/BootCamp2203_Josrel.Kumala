import React, { useState, useEffect } from "react";
import Navigasi from "./Nav";
import ListPost from "./listPost"
import Comment from "./comment";

const Post = (props) => {
  const [list, setList] = useState([]);
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
      const response = await fetch(`http://localhost:3001/post/${id}`);
      const jsondata = await response.json();
      setList(jsondata);
      console.log(list);
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
        <ListPost list={list} name={name}/>
        <Comment id_post={props.match.params.id} name={name} role={role}/>
    </React.Fragment>
  );
}

export default Post
