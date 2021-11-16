import { navigate, Link } from "@reach/router";
import axios from "axios";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errmsg, setErrmsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrmsg("");
    const userData = { email, password };
    try {
      await axios.post("http://localhost:8001/api/signin", userData, {
        withCredentials: true,
      });
      navigate("client/products");
    } catch (err) {
      console.log(err.response.data.error);
      setErrmsg(err.response.data.error);
    }
  };

  return (
    <div style={{ margin: "0 auto" }}>
      <h3 style={{ margin: "20px" }}>Sign in here! </h3>
      <Form
        style={{
          width: "50%",
          height: "60%",
          margin: "0 auto",
          textAlign: "left",
        }}
        onSubmit={handleSubmit}
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errmsg && <Form.Text style={{ color: "red" }}>{errmsg}</Form.Text>}
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
        </Form.Group>

        <Button variant="primary" type="submit">
          Sign In
        </Button>
      </Form>

      <Link to="/">Sign Up</Link>
    </div>
  );
};

export default Login;
