import { useState, useEffect } from 'react'
import logo from './logo.svg'
import List from './textList'
import Card from 'react-bootstrap/Card'
import './App.css'
import {uid} from "uid"
import axios from 'axios'

function App() {

  //show hide button
  const[showDetail,setShowDetail] = useState(true)

  const [contacts, setContacts] = useState([ ]);

const [isUpdate, setIsUpdate] = useState({id: null, status: false})

const [formData, setFormData] = useState({
  name:  "",
  telp: "",
  email: "",
})

const [detailData, setDetailData] = useState({
  name:  "",
  telp: "",
  email: "",
})

useEffect(()=> {
  //ambil data dari json
  axios.get('http://localhost:3000/contacts')
  .then(res => {
    console.log(res.data)
    //fungsi ? kalo misalnya ga ada data ato undefined maka akan ngereturn array kosong
    setContacts(res?.data ?? [ ])
  })
}, [ ])

//biar bisa ngetik di si inputnya kalo value doang ga bisa ngetik lagi 
function handleChange(e){
  let data = {...formData}
  data[e.target.name] = e.target.value
  setFormData(data)
}

function handleAdd(e){
  e.preventDefault()
  let data =[...contacts]

  if(formData.name === ""){
    return false
  }
  if(formData.telp === ""){
    return false
  }
  if(formData.email === ""){
    return false
  }

  if(isUpdate.status){
    data.forEach((contact) => {
      if(contact.id === isUpdate.id){
        contact.name = formData.name
        contact.telp = formData.telp
        contact.email = formData.email
      }
    })

    axios.put(`http://localhost:3000/contacts/${isUpdate.id}`,{
      name: formData.name,
      telp: formData.telp,
      email: formData.email,
    }).then(res => {
      alert("berhasil update data")
    })
  }else{
    let newData = {id: uid(), name: formData.name, telp: formData.telp, email: formData.email}
    data.push(newData)

    axios.post('http://localhost:3000/contacts', newData).then(res =>{
      alert("Berhasil Menyimpan Data")
    })
  }
  //nambah kontak
  setIsUpdate({id: null, status: false})
  setContacts(data)
  setFormData({name: "", telp: "", email: ""})
}

function handleEdit(id){
  let data = [...contacts]
  let foundData = data.find((contact) => contact.id === id)
  setFormData({name: foundData.name, telp: foundData.telp, email: foundData.email})
  setIsUpdate({id: id, status: true })
}
function handleDetail(id){
  let data = [...contacts]
  let foundData = data.find((contact) => contact.id === id)
  setDetailData({name: foundData.name, telp: foundData.telp, email: foundData.email})
  setShowDetail(!showDetail)
}

function handleRemove(id){
  let data = [...contacts]
  let filteredData = data.filter(contact => contact.id !== id)

  axios.delete(`http://localhost:3000/contacts/${id}`).then(res => {
    alert("berhasil menghapus data")
  })
  setContacts(filteredData)
}
  return (
    <div className="App">
      <h1 className="px-3 py-3">My Contact List</h1>

      <form onSubmit={handleAdd} className="px-3 py-4">
        <div className="form-group">
          <label htmlFor="">Name</label>
          <input type="text" 
          className="form-control" 
          onChange={handleChange}
          value={formData.name}
          name="name" />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="">Mobile</label>
          <input type="text" 
          className="form-control" 
          onChange={handleChange}
          value={formData.telp}
          name="telp" />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="">Email</label>
          <input type="text" 
          className="form-control" 
          onChange={handleChange}
          value={formData.email}
          name="email" />
        </div>
        <div>
          <button type="submit" className="btn btn-primary w-100 mt-3">
            Save
          </button>
        </div>
      </form>
      <List handleRemove={handleRemove} handleEdit={handleEdit} handleDetail={handleDetail} data={contacts} />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      {
          showDetail?<Card>
          <Card.Header><h1>{detailData.name}</h1></Card.Header>
          <Card.Body>
            <blockquote className="blockquote mb-0">
              <p>
              {detailData.email}
              <br />
              {detailData.telp}
              </p>
            </blockquote>
          </Card.Body>
        </Card>:null
      }
    </div>
  );
}
export default App
