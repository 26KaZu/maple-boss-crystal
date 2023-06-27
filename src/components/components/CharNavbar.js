import { Button, Group, Navbar, Text } from "@mantine/core";
import { logout } from "../../firebase";
import "./CharNavbar.css";

const CharNavbar = ({ user, userDoc, showModal }) => {
  return (
    <Navbar className="char-navbar">
      <Navbar.Section className="nav-title-section">
        <Text>Maple Boss Crystals</Text>
      </Navbar.Section>
      <Navbar.Section className="nav-user-section">
        {!user ? (
          <Button onClick={showModal} className="char-navbar-btn">
            Login/Register
          </Button>
        ) : (
          <div>
            <Text id="display-name">
              Welcome back, <br />
              {userDoc.name}
            </Text>
            <Button onClick={logout} className="char-navbar-btn">
              Logout
            </Button>
          </div>
        )}
      </Navbar.Section>
      {!user ? (
        ""
      ) : (
        <Navbar.Section className="nav-characters-section">
          <h5>Characters</h5>
          <Group></Group>
        </Navbar.Section>
      )}
    </Navbar>
  );
};

export default CharNavbar;
