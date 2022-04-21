import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Nav from './Nav'
import Coba from './Toast'
import TextList from './textList'
import Contact from './cobakontak'
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Nav />
    <br></br>
    <Coba />
    {/* <Contact /> */}
    <TextList />
    {/* <App /> */}

  </React.StrictMode>
)
