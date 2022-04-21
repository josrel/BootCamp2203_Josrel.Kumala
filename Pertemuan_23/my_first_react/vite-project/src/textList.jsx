import React from "react";
import Contact from "./contact"
import Card from 'react-bootstrap/Card'
export default function App(){
    const Nama = Contact.map((item) => {
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