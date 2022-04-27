import react, { useState,useEffect } from "react";
import Button from "react-bootstrap/esm/Button";

const DelList = ({contact}) => {
    const [list, setList] = useState([contact]);
    
    const delContact = async (id) => {
        try {
          await fetch(`http://localhost:3001/contact/${contact.id}`, {
            method: "DELETE",
          });
          setList(list.filter((contact) => contact.id !== id));
        } catch (error) {
          console.error(error.message);
        }
      };
      return(
          <Button onClick={delContact}>delete</Button>
      )
}

export default DelList