import React from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import{BrowserRouter as Router,Routes ,Route} from "react-router-dom";
import Noodle from './Noodle';

function App() {
  return (
    <Router>
      <Header/>
    <div className="App">
      <Routes>
      <Route path='/' element={<Home/>}>

      
      <Route path='checkout' element={<Cart/>}/>
      
      </Route>
      
      
      </Routes>
    </div>
    </Router>
  );
}

export default App;
