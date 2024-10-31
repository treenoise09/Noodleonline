import React from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import Report from './Report';
import History from './History';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react';
import { db, auth } from './firebase';
import { useStateValue } from "./stateprovider";

function App() {
  const [{ user }] = useStateValue();
  const [userRole, setUserRole] = useState('');
  const [search, setSearch] = useState("");
  const [{ basket }] = useStateValue();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        const docRef = db.collection("Users").doc(userAuth.uid);

        docRef.get().then((doc) => {
          if (doc.exists) {
            const data = doc.data();
            setUserRole(data.Role[0]);
          } else {
            console.log("No such document!");
          }
        }).catch((error) => {
          console.log("Error getting document:", error);
        });
      } else {
        setUserRole(''); // reset role when user logs out
      }
    });

    return unsubscribe;
  }, []);
  const [isCartVisible, setIsCartVisible] = useState(false);

  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
  };

  return (
    <Router>
      <Header setSearch={setSearch} toggleCart={toggleCartVisibility} />
      <div className="App">
        <Routes>
          <Route path='/' element={<Home userRole={userRole} search={search} toggleCart={toggleCartVisibility} isCartVisible={isCartVisible} />} />
          <Route path='/History' element={<History />} />
          <Route path='/report' element={<Report userRole={userRole} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
