import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom'


class SectionItem extends Component {
  constructor() {
    super();
    this.state = {
      section: {
        sectionLengthsList: []
      },
      pieces: [],
      redirect: false
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

  // _setLengthsList = async (projectId, sectionId) => {
    
  //   this.state.pieces.map((piece) => {

  //   })
  // }

  _fetchSection = async (projectId, sectionId) => {
    try {
      const response = await axios.get(`/api/projects/${projectId}/sections/${sectionId}`)
      this.setState({section: response.data});
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
  _deleteSection = async (e) => {
    const projectId = this.props.match.params.projectId
    const sectionId = this.props.match.params.sectionId;
      try {
          const res = await axios.delete(`/api/projects/${projectId}/sections/${sectionId}`)
          this.setState({redirect: true})
          return res.data
      } catch(err) {
          console.log(err)
      }
  }
  

  render() {
    const projectId = this.props.match.params.projectId;
    const sectionId = this.props.match.params.sectionId;

    return (
      <div>
          {this.state.redirect? 
                <Redirect to={`/projects/${projectId}`}/>
                :
                <div>
                    <img src={this.state.section.sectionPictureURL} alt="" />
                    <h3>Section Name: {this.state.section.name}</h3>
                    <h4>Description: {this.state.section.description}</h4>
                    <Link to={`/projects/${projectId}/sections/${sectionId}/piece/new`}>
                        <Button>Add A Piece</Button>
                    </Link>
                    
                    {this.state.pieces.map(piece => (
                        <div key={piece.id}>
                            <Link to={`/projects/${projectId}/sections/${sectionId}/pieces/${piece.id}`}>
                            <h4>{piece.pieceLabel}</h4>
                            <span>{piece.pieceLength}" &times; {piece.pieceWidth}" &times; {piece.pieceHeight}"</span>
                            </Link>
                            
                        </div>
                    ))}
                    <hr />
                    <Link to={`/projects/${projectId}/editsection/${this.state.section.id}`}><Button>Edit Section</Button></Link>
                    <br />
                    <br />
                    <Link to={`/projects/${projectId}/`}>
                        <Button>Go Back</Button>
                    </Link>
                    <Button onClick={this._deleteSection}>Delete Section</Button>
                </div>
          }
      </div>
    );
  }
}

export default SectionItem;