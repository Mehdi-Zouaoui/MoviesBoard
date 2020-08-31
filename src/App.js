import React from 'react';
import logo from './logo.svg';
import './App.css';
import Search from "./Components/Search";
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import SearchResult from "./Components/SearchResult";

function App() {
  return (
    <div className="App">
    <Router>
        <Switch>
            <Route path="/search" component={Search}/>
            <Route path="/result/:id?" component={SearchResult}/>
        </Switch>
    </Router>
    </div>
  );
}

export default App;
