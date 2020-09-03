import React from 'react';
import logo from './logo.svg';
import './App.css';
import Search from "./Components/Search";
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import SearchResult from "./Components/SearchResult";
import Movies from "./Components/Movies";
import Navigation from "./Components/Navigation";

function App() {
  return (
    <div className="App">
    <Router>
        <Navigation/>
        <Switch>

            <Route exact path="/" component={Movies}/>
            <Route exact path="/search" component={Search}/>
            {/*<Route exact path="/movie/:id?" component={SearchResult}/>*/}

        </Switch>
    </Router>
    </div>
  );
}

export default App;
