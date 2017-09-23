import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class PieceItem extends Component {
  constructor() {
    super();
    this.state = {
      piece: {}
    };
  }

  componentWillMount() {
    const projectId = this.props.match.params.projectId
    console.log("projectId in PieceItem is: " + projectId)
    const sectionId = this.props.match.params.sectionId;
    console.log("sectionId in PieceItem is: " + sectionId)
    const pieceId = this.props.match.params.pieceId;
    console.log("pieceId in PieceItem is: " + pieceId)
    this._fetchPiece(projectId, sectionId, pieceId)
  }

  _fetchPiece = async (projectId, sectionId, pieceId) => {
    try {
      const response = await axios.get(`/api/projects/${projectId}/sections/${sectionId}/pieces/${pieceId}`)
      await this.setState({piece: response.data});
      return response.data;
    }
    catch (err) {
      await this.setState({error: err.message})
      return err.message
    }
  } 

  render() {
    return (
      <div>
        <h1>{this.state.piece.pieceLabel}</h1>
      </div>
    );
  }
}

export default SectionItem;