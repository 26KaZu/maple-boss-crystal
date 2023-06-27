import { Box, Button, Input, Text } from "@mantine/core";
import { resetPassword } from "../../firebase";
import { useState } from "react";
import "./Login.css";

const Reset = ({ setShow, hideModal }) => {
  const [resetInput, setResetInput] = useState({
    email: "",
  });

  const handleChange = (key, e) => {
    setResetInput({ ...resetInput, [key]: e.target.value });
  };

  const handleBtnDisabled = () => {
    if (!resetInput.email) {
      return true;
    } else {
      return false;
    }
  };

  const handleReset = (event) => {
    event.preventDefault();
    resetPassword(resetInput.email)
      .then(() => alert("Reset link has been sent to your E-mail!"))
      .then(() => hideModal());
  };

  return (
    <Box className="login-box">
      <h4 id="login-title">Reset Password</h4>
      <form onSubmit={handleReset} className="login-form">
        <Input
          placeholder="E-mail Address*"
          value={resetInput.email}
          onChange={(e) => handleChange("email", e)}
          type="email"
          className="login-input"
          required
        />
        <Button type="submit" id="login-btn" disabled={handleBtnDisabled()}>
          Send Reset Link
        </Button>
      </form>
      <Text className="login-text">
        <div className="login-text-link" onClick={() => setShow("login")}>
          Back to Login
        </div>
      </Text>
    </Box>
  );
};

export default Reset;
