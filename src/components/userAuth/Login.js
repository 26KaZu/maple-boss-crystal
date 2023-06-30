import { Box, Button, Input, Text } from "@mantine/core";
import { loginWithEmail } from "../../firebase";
import { useState } from "react";
import "./Login.css";

const Login = ({ setShow, hideModal }) => {
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });

  const handleChange = (key, e) => {
    setLoginInput({ ...loginInput, [key]: e.target.value });
  };

  const handleBtnDisabled = () => {
    if (!(loginInput.email && loginInput.password)) {
      return true;
    } else {
      return false;
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();
    loginWithEmail(loginInput.email, loginInput.password).then(() =>
      hideModal()
    );
  };

  return (
    <Box className="login-box">
      <h4 id="login-title">Login</h4>
      <form onSubmit={handleLogin} className="login-form">
        <Input
          placeholder="E-mail Address*"
          value={loginInput.email}
          onChange={(e) => handleChange("email", e)}
          type="email"
          className="login-input"
          required
        />
        <Input
          placeholder="Password*"
          value={loginInput.password}
          onChange={(e) => handleChange("password", e)}
          type="password"
          className="login-input"
          required
        />
        <Button type="submit" id="login-btn" disabled={handleBtnDisabled()}>
          Login
        </Button>
      </form>
      <Text className="login-text">
        <div className="login-text-link" onClick={() => setShow("reset")}>
          Forget password
        </div>
        <div className="login-text-link" onClick={() => setShow("register")}>
          Don't have an account? Register
        </div>
      </Text>
    </Box>
  );
};

export default Login;
