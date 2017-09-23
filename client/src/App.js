import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ProjectList from "./components/ProjectList";
import ProjectItem from "./components/ProjectItem";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div>
            <h1>scrapsave</h1>
          </div>
          <Route exact path="/" component={ProjectList} />
          <Route path="/project/:id" component={ProjectItem} />
        </div>
      </Router>
    );
  }
}

export default App;
