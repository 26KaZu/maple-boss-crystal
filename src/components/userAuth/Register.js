import { Box, Button, Input, Text } from "@mantine/core";
import { registerWithEmail } from "../../firebase";
import { useState } from "react";
import "./Login.css";
import { notifications } from "@mantine/notifications";

const Register = ({ setShow, hideModal }) => {
  const [registerInput, setRegisterInput] = useState({
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
    displayName: "",
  });

  const handleChange = (key, e) => {
    setRegisterInput({ ...registerInput, [key]: e.target.value });
  };

  const handleBtnDisabled = () => {
    if (
      !(
        registerInput.email &&
        registerInput.confirmEmail &&
        registerInput.password &&
        registerInput.confirmPassword &&
        registerInput.displayName
      )
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleRegister = (event) => {
    event.preventDefault();

    if (
      !(
        registerInput.email &&
        registerInput.confirmEmail &&
        registerInput.password &&
        registerInput.confirmPassword &&
        registerInput.displayName
      )
    ) {
      notifications.show({
        title: "Error",
        message: "Please fill in all the required fields",
        autoClose: 3000,
        color: "red",
      });
    } else if (registerInput.email !== registerInput.confirmEmail) {
      notifications.show({
        title: "Error",
        message: "The two e-mail addresses do not match!",
        autoClose: 3000,
        color: "red",
      });
    } else if (registerInput.password !== registerInput.confirmPassword) {
      notifications.show({
        title: "Error",
        message: "The two passwords do not match!",
        autoClose: 3000,
        color: "red",
      });
    } else if (
      registerInput.email &&
      registerInput.confirmEmail &&
      registerInput.password &&
      registerInput.confirmPassword &&
      registerInput.displayName &&
      registerInput.email === registerInput.confirmEmail &&
      registerInput.password === registerInput.confirmPassword
    ) {
      registerWithEmail(
        registerInput.email,
        registerInput.password,
        registerInput.displayName
      ).then(() => {
        hideModal();
      });
    }
  };

  return (
    <Box className="login-box">
      <h4 id="login-title">Register</h4>
      <form onSubmit={handleRegister} className="login-form">
        <Input
          placeholder="Display Name*"
          value={registerInput.displayName}
          onChange={(e) => handleChange("displayName", e)}
          type="text"
          className="login-input"
          required
        />
        <Input
          placeholder="E-mail Address*"
          value={registerInput.email}
          onChange={(e) => handleChange("email", e)}
          type="email"
          className="login-input"
          required
        />
        <Input
          placeholder="Confirm E-mail Address*"
          value={registerInput.confirmEmail}
          onChange={(e) => handleChange("confirmEmail", e)}
          type="email"
          className="login-input"
          required
        />
        <Input
          placeholder="Password*"
          value={registerInput.password}
          onChange={(e) => handleChange("password", e)}
          type="password"
          className="login-input"
          required
        />
        <Input
          placeholder="Confirm Password*"
          value={registerInput.confirmPassword}
          onChange={(e) => handleChange("confirmPassword", e)}
          type="password"
          className="login-input"
          required
        />
        <Button type="submit" id="login-btn" disabled={handleBtnDisabled()}>
          Register
        </Button>
      </form>
      <Text className="login-text">
        <div className="login-text-link" onClick={() => setShow("login")}>
          Already have an account? Login
        </div>
      </Text>
    </Box>
  );
};

export default Register;
