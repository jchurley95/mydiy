import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ProjectList from "./components/ProjectList";
import ProjectItem from "./components/ProjectItem";
import SectionItem from './components/SectionItem';
import PieceItem from './components/PieceItem';
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div>
            <Link to="/"><h1>ScrapSave</h1></Link>
          </div>
          <Route exact path="/" component={ProjectList} />
          <Route path="/projects/:projectId" component={ProjectItem} />
          <Route path="/projects/:projectId/sections/:sectionId" component={SectionItem} />
          <Route path="/projects/:projectId/sections/:sectionId/pieces/:pieceId" component={PieceItem} />
        </div>
      </Router>
    );
  }
}

export default App;
