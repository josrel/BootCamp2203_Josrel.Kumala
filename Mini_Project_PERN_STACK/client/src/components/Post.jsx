import React, { useState, useEffect } from "react";
import ListThread from "./listThread";
import Button from "react-bootstrap/Button";
import Dashboard from "./Dashboard";
import Navigasi from "./Nav";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import AddThread from "../components/AddThread"
import ListPost from "./listPost"
import Form from "react-bootstrap/Form";
import Badge from 'react-bootstrap/Badge'
import AddComment from "./addComment"
import Comment from "./comment";

const Post = (props) => {
  const [list, setList] = useState([]);
  const [show, setShow] = useState(false);
  const [showReply, setShowReply] = useState(false);

  const [comment, setComment] = useState([]);

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
        <Comment id_post={props.match.params.id} name={name}/>
    </React.Fragment>
  );
}

export default Post
