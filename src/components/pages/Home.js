import "./Home.css";
import { Box, Container, Modal, Text } from "@mantine/core";
import { useState } from "react";
import UserAuth from "../userAuth/UserAuth";
import CharNavbar from "../components/CharNavbar";

const Home = ({ user, userDoc }) => {
  const [modal, setModal] = useState(false);
  const showModal = () => setModal(true);
  const hideModal = () => setModal(false);

  return (
    <div className="home-div">
      <Modal
        opened={modal}
        onClose={hideModal}
        closeOnEscape
        closeOnClickOutside
        centered
      >
        <UserAuth hideModal={hideModal} />
      </Modal>
      <Container className="home-container" fluid px={0}>
        <Box w={240} id="char-nav-box">
          <CharNavbar
            user={user}
            userDoc={userDoc}
            showModal={showModal}
            hideModal={hideModal}
          />
        </Box>
        <Box id="content-nav-box">
          {!user ? (
            <Text>Please login first</Text>
          ) : userDoc?.characters.length === 0 ? (
            <Text>Please add a character</Text>
          ) : (
            ""
          )}
        </Box>
      </Container>
    </div>
  );
};

export default Home;
