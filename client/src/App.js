import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import ProjectList from "./components/ProjectList";
import ProjectItem from "./components/ProjectItem";
import NewProject from './components/NewProject';
import EditProject from './components/EditProject';

import SectionItem from './components/SectionItem';
import NewSection from './components/NewSection';
import EditSection from './components/EditSection';

import PieceItem from './components/PieceItem';
import NewPiece from './components/NewPiece';
import EditPiece from './components/EditPiece';

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
          <Route path="/project/new" component={NewProject} />
          <Route exact path="/projects/:projectId" component={ProjectItem} />
          <Route path="/editproject/:projectId" component={EditProject} />
          <Route exact path="/projects/:projectId/section/new" component={NewSection} />
          <Route path="/projects/:projectId/editsection/:sectionId" component={EditSection} />
          <Route exact path="/projects/:projectId/sections/:sectionId" component={SectionItem} />
          <Route exact path="/proj/:projectId/sect/:sectionId/editpiece/:pieceId" component={EditPiece} />
          <Route path="/projects/:projectId/sections/:sectionId/pieces/:pieceId" component={PieceItem} />
          <Route path="/projects/:projectId/sections/:sectionId/piece/new" component={NewPiece} />
        </div>
      </Router>
    );
  }
}

export default App;
