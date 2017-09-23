import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'

class PieceItem extends Component {
  constructor() {
    super();
    this.state = {
      piece: {},
      redirect: false
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

  _deletePiece = async (e) => {
    const projectId = this.props.match.params.projectId
    const sectionId = this.props.match.params.sectionId;
    const pieceId = this.props.match.params.pieceId;
      try {
          const res = await axios.delete(`/api/projects/${projectId}/sections/${sectionId}/pieces/${pieceId}`)
          this.setState({redirect: true})
          return res.data
      } catch(err) {
          console.log(err)
      }
  }

  render() {
    const projectId = this.props.match.params.projectId
    const sectionId = this.props.match.params.sectionId;
    const pieceId = this.props.match.params.pieceId;
    return (
      <div>
            {this.state.redirect? 
                <Redirect to={`/projects/${projectId}/sections/${sectionId}`}/>
                :
                <div>
                    <h4>{this.state.piece.pieceLabel}</h4>
                    <span>{this.state.piece.pieceLength} &times; {this.state.piece.pieceWidth} &times; {this.state.piece.pieceHeight}</span>
                    <button onClick={this._deletePiece}>Delete Piece</button>
                </div>
            }
      </div>
    );
  }
}

export default PieceItem;