import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ProjectList from "./components/ProjectList";
import ProjectItem from "./components/ProjectItem";
import NewProject from './components/NewProject';
import SectionItem from './components/SectionItem';
import NewSection from './components/NewSection';
import PieceItem from './components/PieceItem';
import NewPiece from './components/NewPiece';
import "./App.css";
import { Button } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div>
            <Link to="/"><h1>ScrapSave</h1></Link>
          </div>
          <div>
            <Link to={`/project/new`}>
            <Button>Build A New Project</Button>
            </Link>
          </div>
          <Route exact path="/" component={ProjectList} />
          <Route exact path="/project/new" component={NewProject} />
          <Route exact path="/projects/:projectId" component={ProjectItem} />
          <Route exact path="/projects/:projectId/section/new" component={NewSection} />
          <Route exact path="/projects/:projectId/sections/:sectionId" component={SectionItem} />
          <Route exact path="/projects/:projectId/section/:sectionId/piece/new" component={NewPiece} />
          <Route exact path="/projects/:projectId/sections/:sectionId/pieces/:pieceId" component={PieceItem} />
        </div>
      </Router>
    );
  }
}

export default App;
