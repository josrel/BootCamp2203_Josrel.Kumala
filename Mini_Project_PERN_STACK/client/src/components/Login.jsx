import React, { Fragment, useState } from "react";
import Button from 'react-bootstrap/Button'
import Form from "react-bootstrap/Form";

const Login = ({ setAuth }) => {

    const [inputs,setInputs] = useState({
        email: "",
        password: ""
    })

    const {email, password} = inputs

    const handleChange = e => {
        setInputs({...inputs, [e.target.name]: e.target.value})
    }

    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {

            const body = {email,password}
            const response = await fetch("http://localhost:3001/auth/login",{
                method:"POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(body)
            })

            const parseRes = await response.json()

            localStorage.setItem("token", parseRes.token)

            setAuth(true)

            console.log(parseRes)
        } catch (error) {
            console.error(error.message)
        }
    }

  return (
    <Fragment>
      <h1>Login</h1>
      <Form onSubmit={onSubmitForm}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
          type="email" 
          placeholder="Enter email" 
          name="email"
          value={email}
          onChange={e => handleChange(e)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={e => handleChange(e)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
      <a href={"/register"}>register</a>
    </Fragment>
  );
};

export default Login;
