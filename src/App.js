import { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
// import Header from "./components/components/Header";
import { auth, obtainUserDoc } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { getDoc } from "firebase/firestore";
import UserAuth from "./components/userAuth/UserAuth";

const App = () => {
  const [user] = useAuthState(auth);
  const [userDoc, setUserDoc] = useState({});

  useEffect(() => {
    const fetchUserDoc = async () => {
      if (user) {
        try {
          const userRef = obtainUserDoc(user);
          const userSnap = await getDoc(userRef);
          setUserDoc(userSnap.data());
        } catch (err) {
          console.error(err.message);
          alert(err.message);
        }
      }
    };
    fetchUserDoc();
  }, [user]);

  console.log(userDoc);

  return (
    <div className="App">
      {/* <Header user={user} /> */}
      <div className="app-body-div">
        <Routes>
          <Route
            exact
            path="/"
            element={<Home user={user} userDoc={userDoc} />}
          />
          <Route exact path="/login" element={<UserAuth />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
