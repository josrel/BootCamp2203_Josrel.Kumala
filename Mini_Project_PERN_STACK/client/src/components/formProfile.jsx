import React, { useState, useEffect, Fragment } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";

const FormProfile = ({list, name}) => {
    const [updateNama, setUpdateNama] = useState();
    console.log(list)
  return (
    <Fragment>
      <h1>edit profile {name}</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={updateNama}
            placeholder="aasdas"
            onChange={(e) => setUpdateNama(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Re-Enter Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
        >
          Submit
        </Button>
      </Form>
    </Fragment>
  );
};
export default FormProfile;