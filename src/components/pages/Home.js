import "./Home.css";
import { AppShell, Box, Container, Header, Modal, Text } from "@mantine/core";
import { useState } from "react";
import UserAuth from "../userAuth/UserAuth";
import CharNavbar from "../components/CharNavbar";

const Home = ({ user, userDoc }) => {
  const [modal, setModal] = useState(false);
  const showModal = () => setModal(true);
  const hideModal = () => setModal(false);

  const [content, setContent] = useState("overview");

  const handleContent = () => {
    if (content === "overview") {
      return;
    } else if (content === "character") {
      return;
    } else if (content === "profile") {
      return;
    }
  };

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
      {/* <Container className="home-container" fluid px={0}>
        <Box w={240} id="char-nav-box">
          <CharNavbar
            user={user}
            userDoc={userDoc}
            showModal={showModal}
            hideModal={hideModal}
            setContent={setContent}
          />
        </Box>
        <Box id="content-nav-box">
          {!user ? (
            <Text>Please login first</Text>
          ) : userDoc.characters?.length === 0 ? (
            <Text>Please add a character</Text>
          ) : (
            ""
          )}
        </Box>
      </Container> */}
      <AppShell
        navbar={
          <CharNavbar
            user={user}
            userDoc={userDoc}
            showModal={showModal}
            hideModal={hideModal}
            setContent={setContent}
          />
        }
        header={
          <Header height={60} p="xs" className="header">
            <Text id="header-title">MapleStory Boss Tracker</Text>
          </Header>
        }
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
      >
        App here
      </AppShell>
    </div>
  );
};

export default Home;
