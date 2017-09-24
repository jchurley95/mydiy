import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom'
import { Button } from 'react-bootstrap';


class PieceItem extends Component {
  constructor() {
    super();
    this.state = {
      section: {},
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
    this._fetchSection(projectId, sectionId)
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

  _deletePiece = async (e) => {
    const projectId = this.props.match.params.projectId
    const sectionId = this.props.match.params.sectionId;
    const pieceId = this.props.match.params.pieceId;
      try {
          const res = await axios.delete(`/api/projects/${projectId}/sections/${sectionId}/pieces/${pieceId}`)
          this._removeLengthFromSectionList(projectId, sectionId)
          this.setState({redirect: true})
          return res.data
      } catch(err) {
          console.log(err)
      }
  }
  _removeLengthFromSectionList = async (projectId, sectionId) => {
    console.log("pieceLength in state is: "+this.state.piece.pieceLength);
    const pieceList = this.state.section.sectionLengthsList;
    const pieceLength = this.state.piece.pieceLength;
    console.log("pieceLength is: " + pieceLength)
    console.log("pieceList is " + pieceList);
    pieceList.map((length, index) => {
      if (length === pieceLength) {
        console.log("Found a piece with length: " + length);
        pieceList.splice(index, 1)
        console.log("pieceList is now " + pieceList);
        this.setState({
          section: {
            sectionLengthsList: pieceList
          }
        })
      }
    });
    const payload = this.state.section
    console.log("payload.sectionLengthsList is: " + payload.sectionLengthsList);
    console.log("payload is: " + payload);
    try {
        const res = await axios.put(`/api/projects/${projectId}/sections/${sectionId}`, payload)
        this.setState({redirect: true})
        return res.data
    } 
    catch (err) {
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
                    <h4><span>{this.state.piece.pieceLength} &times; {this.state.piece.pieceWidth} &times; {this.state.piece.pieceHeight}</span></h4>
                    <Link to={`/projects/${projectId}/sections/${sectionId}/editpiece/${pieceId}`}><Button>Edit Piece</Button></Link>
                    <br />
                    <br />
                    <Button onClick={this._deletePiece}>Delete Piece</Button>
                </div>
            }
      </div>
    );
  }
}

export default PieceItem;