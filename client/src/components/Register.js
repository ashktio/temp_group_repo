import React, { useState } from "react";
import axios from "axios";
import { navigate, Link } from "@reach/router";
import { Form, Button } from "react-bootstrap";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errmsg, setErrmsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const regData = {
      firstName,
      lastName,
      email,
      username,
      password,
      confirmPassword,
    };
    try {
      await axios.post("http://localhost:8001/api/signup", regData);
      navigate("client/signin");
    } catch (error) {
      console.log(error.response.data);
      setErrmsg(error.response.data.errors);
      console.log(errmsg);
    }
  };

  return (
    <div>
      <h3 style={{ margin: "20px" }}>Sign Up! </h3>

      <Form
        style={{
          width: "50%",
          height: "60%",
          margin: "0 auto",
          textAlign: "left",
        }}
        onSubmit={handleSubmit}
      >
        <Form.Group className="mb-3" controlId="formBasicFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter First Name"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          {errmsg && errmsg.firstName && (
            <Form.Text style={{ color: "red" }}>
              {errmsg.firstName.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Last Name"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          {errmsg && errmsg.lastName && (
            <Form.Text style={{ color: "red" }}>
              {errmsg.lastName.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errmsg && errmsg.email && (
            <Form.Text style={{ color: "red" }}>
              {errmsg.email.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errmsg && errmsg.username && (
            <Form.Text style={{ color: "red" }}>
              {errmsg.username.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errmsg && errmsg.password && (
            <Form.Text style={{ color: "red" }}>
              {errmsg.password.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errmsg && errmsg.confirmPassword && (
            <Form.Text style={{ color: "red" }}>
              {errmsg.confirmPassword.message}
            </Form.Text>
          )}
        </Form.Group>

        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>

      <Link to="/client/signin">Sign In</Link>
    </div>
  );
};

export default Register;
