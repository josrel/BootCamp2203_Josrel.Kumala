import React, { useState } from "react";
import Contact from "./contact"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {uid} from 'uid'
import axios from 'axios';
import { Alert } from "react-bootstrap";
import contact from "./contact";

export default function App(){

    const [list, setList] = useState(Contact);

    function handleRemove(id) {
        const newList = [...list].filter((item) => item.id !== id);
        setList(newList);
        console.log(newList)
        console.log(list)
      }

      const [formData, setFormData] = useState({
        Name: "",
        Email: "",
        Mobile: ""
      })

      const [isUpdate, setIsUpdate] = useState ({id: null, status: false})

      function handleChange(e){
          let data = {...formData}
          data[e.target.name] = e.target.value
          setFormData(data)
      }

      function handleAdd(e){
          e.preventDefault()
          alert("oke");
          let data = [...Contact]

            if(isUpdate.status){
                data.forEach((Contact) => {
                    if (Contact.id === isUpdate.id){
                        Contact.Name = formData.name
                        Contact.Mobile = formData.telp
                        Contact.Email = formData.email
                    }
                })
            } else{
                data.push({id: uid(), Name: formData.name, Mobile: formData.telp, Email: formData.email})
            }
            setList(data)
      }


      function handleEdit(id){
        let data = [...Contact]
        let foundData = data.find((contact) => Contact.id === id)
        setFormData({Name: foundData.name, Mobile: foundData.telp, Email: foundData.email})
        setIsUpdate({id: id, status: true})
      }


    const Nama = list.map((item) => {
        return (
            <div>
            <Card style={{ width: '18rem' ,float:"left", marginRight:"10px", marginTop:"10px"}}>
            <Card.Body>
                <Card.Title>
                    {item.Name}
                    <hr />
                </Card.Title>
                    <Card.Text>
                        {item.Mobile}
                        <br></br>
                        {item.Email}
                        <br></br>
                        <Button variant="danger" onClick={() => handleRemove(item.id)}>delete</Button>{' '}
                        <Button variant="primary" onClick={() => handleEdit(item.id)}>edit</Button>{' '}
                    </Card.Text>
            </Card.Body>
            </Card>
            </div>
        )
    }
    )
        return(
            <div>
                    <Card style={{ width: '18rem' ,float:"left", marginRight:"10px", marginTop:"10px"}}>
                    <Card.Body>
                            <Card.Text>
                                <Form onSubmit={handleAdd}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" 
                                        onChange={handleChange}
                                        name="name"/>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Mobile</Form.Label>
                                        <Form.Control type="text" 
                                        onChange={handleChange}
                                        name="telp"/>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="text" 
                                        onChange={handleChange}
                                        name="email"/>
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button>
                                    </Form>
                            </Card.Text>
                    </Card.Body>
                </Card>
                {Nama}
            </div>
        )
}