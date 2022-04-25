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

      async function handleRemove(id){
          try {
              let data = [...list]
              let filteredData = data.filter((contact) => contact.id !== id)
              await fetch(`http://localhost:3001/contact/${contact.id}`, {
                method: "DELETE",
              })
              setList(filteredData)
          } catch (error) {
            console.error(error.message);
          }
      }
      return(
          <Button onClick={handleRemove}>delete</Button>
      )
}

export default DelList