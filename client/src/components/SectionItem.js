import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class SectionItem extends Component {
  constructor() {
    super();
    this.state = {
      section: {},
      pieces: [],
    };
  }

  componentWillMount() {
    const projectId = this.props.match.params.projectId
    console.log("projectId in SectionItem is: " + projectId)
    const sectionId = this.props.match.params.sectionId;
    console.log("sectionId in SectionItem is: " + sectionId)
    this._fetchSection(projectId, sectionId)
    this._fetchPieces(projectId, sectionId)
  }

  _fetchSection = async (projectId, sectionId) => {
    try {
      const response = await axios.get(`/api/projects/${projectId}/sections/${sectionId}`)
      await this.setState({section: response.data});
      return response.data;
    }
    catch (err) {
      await this.setState({error: err.message})
      return err.message
    }
  } 

  _fetchPieces = async (projectId, sectionId) => {
    try {
      const response = await axios.get(`/api/projects/${projectId}/sections/${sectionId}/pieces`)
      await this.setState({pieces: response.data});
      return response.data;
    }
    catch (err) {
      await this.setState({error: err.message})
      return err.message
    }
  } 

  render() {
    const projectId = this.props.match.params.projectId
    const sectionId = this.props.match.params.sectionId;
    return (
      <div>
        <img src={this.state.section.sectionPictureURL} alt="" />
        <h3>Section Name: {this.state.section.name}</h3>
        <Link to={`/projects/${projectId}/section/${sectionId}/piece/new`}>Add A Piece</Link>
        {this.state.pieces.map(piece => (
            <div key={piece.id}>
                <Link to={`/projects/${projectId}/sections/${sectionId}/pieces/${piece.id}`}>
                <h4>{piece.pieceLabel}</h4>
                <span>{piece.pieceLength} &times; {piece.pieceWidth} &times; {piece.pieceHeight}</span>
                </Link>
            </div>
        ))}
      </div>
    );
  }
}

export default SectionItem;