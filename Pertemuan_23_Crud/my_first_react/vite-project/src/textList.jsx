import React, { useState } from "react";
import Contact from "./contact"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export default function App(){


    const [list, setList] = React.useState(Contact);

    const Nama = list.map((item) => {
        function handleRemove(id) {
            const newList = list.filter((item) => item.id !== id);
            setList(newList);
          }
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
                        <Button variant="danger" onClick={() => handleRemove(item.id)}>{item.id}</Button>{' '}
                    </Card.Text>
            </Card.Body>
            </Card>
            </div>
        )
    }
    )
        return(
            <div>{Nama}</div>
        )
}