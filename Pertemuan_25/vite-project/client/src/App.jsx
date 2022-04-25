import { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css"
import Table from "react-bootstrap/Table";
import AddList from "./component/addList";
import Button from "react-bootstrap/Button";
import EditList from "./component/editList";

function App() {
  const [list, setList] = useState([]);

  const getContact = async () => {
    try {
      const response = await fetch("http://localhost:3001/contact");
      const jsondata = await response.json();
      setList(jsondata);
    } catch (error) {
      console.log(error.message);
    }
  };

  const delContact = async (id) => {
    try {
      await fetch(`http://localhost:3001/contact/${id}`, {
        method: "DELETE",
      });
      setList(list.filter((contact) => contact.id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getContact();
  }, []);

  return (
    <div>
      <AddList />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>nama</th>
            <th>telp</th>
            <th>email</th>
            <th>delete</th>
            <th>edit</th>
          </tr>
        </thead>
        <tbody>
          {list.map((contact) => (
            <tr>
              <td>{contact.nama}</td>
              <td>{contact.telp}</td>
              <td>{contact.email}</td>
              <td>
                <Button onClick={() => delContact(contact.id)}>delete</Button>
              </td>
              <td>
                <EditList contact={contact}/>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default App;
