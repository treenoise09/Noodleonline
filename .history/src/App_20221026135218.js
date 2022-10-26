import React from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import Noodle from './Noodle';
import{BrowserRouter as Router,Routes ,Route} from "react-router-dom";

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path='/checkout'>
      <Header/>
      <h1>check This out</h1>
      </Route>
      <Route path='/'>
      <Header/>
      <Home/>
      </Route>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
