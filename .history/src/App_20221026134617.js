import React from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import Noodle from './Noodle';
import{BrowserRouter as Router,Switch ,Route} from "react-router-dom";

function App() {
  return (
    <Router>
    <div className="App">
      <Header/>
      <Home/>
       
    </div>
    </Router>
  );
}

export default App;
