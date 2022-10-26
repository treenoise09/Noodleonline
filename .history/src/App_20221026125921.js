import React from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import {BrowserRouter as Rounter, Switch,Rount,Link} from "react-rounter-dom"
import Noodle from './Noodle';

function App() {
  return (
    <div className="App">
      <Header/>
      <Switch>
        <Route path="/noodle">
          <Noodle/>
        </Route>
        <Route path="/">
          <Home/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
