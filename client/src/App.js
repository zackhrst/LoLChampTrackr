import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "boostrap/dist/css/boostrap.min.css";
import './App.css';

import AddChampion from "./components/add-champion.component";
import Champion from "./components/champion.component";
import ChampionsList from "./components/champions-list.component";


class App extends Component {
  render() {
    return (
      <Router>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/champions"} className="navbar-brand">
            lOlChampTrackr
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/champions"} className="nav-link">
                Champions
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/champions"]} component={ChampionsList} />
            <Route exact path="/add" component={AddChampion} />
            <Route exact path="/champions/:id" component={Champion}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
