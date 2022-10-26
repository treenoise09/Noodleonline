import React from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import{BrowserRouter as Router,Routes ,Route} from "react-router-dom";
import Noodle from './Noodle';

function App() {
  return (
    <Router>
    <div className="App">
      
      <Routes>
      <Header/>
        <Route path='checkout' element={<Noodle/>}>
      <h1>check This out</h1>
      </Route>
      <Route path='/' element={<Home/>}>

      </Route>
      
      </Routes>
    </div>
    </Router>
  );
}

export default App;
