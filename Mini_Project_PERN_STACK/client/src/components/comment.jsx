import React, { useState, useEffect } from "react";
import AddComment from "./addComment";
import ListComment from "./listComment";


const Comment = ({id_post}) => {
  const [list, setList] = useState([]);
  // console.log(this.props.match.params.id)

  const getComment = async () => {
    try {
      console.log(id_post)
      const response = await fetch(`http://localhost:3001/comment/${id_post}`);
      const jsondata = await response.json();
      // console.log(jsondata);
      setList(jsondata);
      console.log(list)
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getComment();
  }, []);

  return (
    <React.Fragment>
      <AddComment id_post={id_post}/>
      <ListComment list_comment={list}/>

    </React.Fragment>
  );
}

export default Comment
