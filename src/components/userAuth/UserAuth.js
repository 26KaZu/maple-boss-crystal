import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Reset from "./Reset";

const UserAuth = ({ hideModal }) => {
  const [show, setShow] = useState("login");

  const handleShow = () => {
    if (show === "login") {
      return <Login setShow={setShow} hideModal={hideModal} />;
    } else if (show === "register") {
      return <Register setShow={setShow} hideModal={hideModal} />;
    } else if (show === "reset") {
      return <Reset setShow={setShow} hideModal={hideModal} />;
    }
  };

  return <div>{handleShow()}</div>;
};

export default UserAuth;
