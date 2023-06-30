import {
  Box,
  Button,
  Group,
  Input,
  NavLink,
  Navbar,
  Text,
} from "@mantine/core";
import { logout, putDoc, obtainCharacterDoc } from "../../firebase";
import { getDoc } from "firebase/firestore";
import "./CharNavbar.css";
import { useEffect, useState } from "react";
import { arrayUnion } from "firebase/firestore";

const CharNavbar = ({ user, userDoc, showModal, setContent }) => {
  //Set characters list
  const [chars, setChars] = useState({});
  useEffect(() => {
    const fetchChars = async () => {
      if (user) {
        try {
          const docRef = obtainCharacterDoc(user);
          const docSnap = await getDoc(docRef);
          setChars(docSnap.data());
        } catch (err) {
          console.error(err.message);
          alert(err.message);
        }
      }
    };

    fetchChars();
  }, [user]);

  //Define active state of characters nav
  const [charActive, setCharActive] = useState("");

  //Define selected char
  const [charSelected, setCharSelected] = useState("");

  //Function to add a character
  const [addChar, setAddChar] = useState(false);
  const [addInput, setAddInput] = useState("");

  const showAdd = () => setAddChar(true);
  const hideAdd = () => setAddChar(false);

  //Handle click event on character
  const handleCharClick = (char, i) => {
    setCharActive(i);
    setCharSelected(char);
  };

  //Render characters list into navlinks
  // chars.sort((a, b) => a.sort - b.sort);

  let renderedNav = [];

  for (const charName in chars) {
    let charNav = (
      <NavLink
        className="nav-char-btn"
        key={chars[charName]?.sort}
        description={charName}
        active={chars[charName]?.sort === charActive}
        onClick={() =>
          handleCharClick(
            { [charName]: chars[charName] },
            chars[charName]?.sort
          )
        }
        color="red"
        childrenOffset="xs"
      ></NavLink>
    );

    renderedNav.push(charNav);
  }

  console.log(charSelected);

  const handleAdd = async () => {
    const newObject = {
      bosses: [],
      sort: Object.keys(chars)?.length + 1,
    };

    await putDoc(`users/${user?.uid}/characters`, "info", {
      ...chars,
      [addInput]: newObject,
    });
    setAddInput("");
    hideAdd();
    setChars({
      ...chars,
      [addInput]: newObject,
    });
  };

  //Add bosses to selected char
  const handleAddBoss = async (boss, size) => {
    const newObject = {
      boss: boss,
      partySize: size,
    };

    await putDoc(`users/${user?.uid}/characters`, "info", {
      ...chars,
      [`${charSelected}.bosses`]: arrayUnion.newObject,
    });
    setAddInput("");
    hideAdd();
    setChars({
      ...chars,
      [charSelected]: [...chars.charSelected, newObject],
    });
  };

  return (
    <Navbar className="char-navbar" p="md" width={{ sm: 200, lg: 300 }}>
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
      <Navbar.Section
        className="nav-overview-section"
        onClick={() => {
          setContent("overview");
          setCharActive("");
          setCharSelected("");
        }}
      >
        <Text>Overview</Text>
      </Navbar.Section>
      {!user ? (
        ""
      ) : (
        <Navbar.Section className="nav-characters-section">
          <h5>Characters</h5>
          <Box className="nav-chars-list">
            {renderedNav.sort((a, b) => a.key - b.key)}
          </Box>
          {!addChar ? (
            <Button
              variant="default"
              className="add-char-btn"
              onClick={showAdd}
            >
              Add Character
            </Button>
          ) : (
            <span>
              <Input
                placeholder="IGN"
                value={addInput}
                onChange={(e) => setAddInput(e.target.value)}
                id="add-char-input"
              />
              <Button className="add-char-btn" onClick={hideAdd}>
                Cancel
              </Button>
              <Button className="add-char-btn" onClick={handleAdd}>
                Add
              </Button>
            </span>
          )}{" "}
        </Navbar.Section>
      )}
    </Navbar>
  );
};

export default CharNavbar;
