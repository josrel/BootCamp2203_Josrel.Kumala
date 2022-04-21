import React,{Component} from "react"
import Contact from "./contact"
import Card from 'react-bootstrap/Card'
export default function App(){
    const Nama = Contact.map((item) => {
        return <p>{item.Name}</p>
    }
    )
    const Email = Contact.map((item) => {
        return <p>{item.Email}</p>
    })
    const Mobile = Contact.map((item) => {
        return <p>{item.Mobile}</p>
    })
    
    return(
        <div>
            {Nama}
            {Email}
            {Mobile}
        </div>
    )
}