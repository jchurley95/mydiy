import React, { Component } from 'react';
import axios from 'axios'
import { Redirect } from 'react-router-dom'

export default class NewPiece extends Component {
    constructor(){
        super();
        this.state = {
            newPiece: {
                pieceLabel: '',
                pieceLength: 0,
                pieceWidth: 0,
                pieceHeight: 1,
                section_id: 0,
                project_id: 0
            },
            redirect: false
        }
    }

    _handleChange = (e) => {
        const newState = {...this.state.newPiece};
        newState[e.target.name] = e.target.value;
        this.setState({
            newPiece: newState
        });
    }
    
    _addPieceToSection = async (e) => {
        e.preventDefault();
        const projectId = this.props.match.params.projectId;
        const sectionId = this.props.match.params.sectionId;
        this.state.newPiece.project_id = projectId;
        this.state.newPiece.section_id = sectionId;
        const payload = this.state.newPiece
        const res = await axios.post(`/api/projects/${projectId}/sections/${sectionId}/pieces`, payload)
        this.setState({redirect: true});
    }
      
    render() {
        const projectId = this.props.match.params.projectId;
        const sectionId = this.props.match.params.sectionId;
        return (
            <div>
                
                {this.state.redirect? 
                    <Redirect to={`/projects/${projectId}/sections/${sectionId}`}/>
                    :
                    <form onSubmit={this._addPieceToSection}>
                        <div>
                            <label htmlFor="pieceLabel">Piece Label: </label>
                            <input onChange={this._handleChange} type="text" pieceLabel="pieceLabel"  required/>
                        </div>
                        <div>
                            <label htmlFor="pieceLength">Length: </label>
                            <input onChange={this._handleChange} type="text" name="pieceLength" required/>
                        </div>
                        <div>
                            <label htmlFor="pieceWidth">Width: </label>
                            <input onChange={this._handleChange} type="text" name="pieceWidth"  required/>
                        </div>
                        <div>
                            <label htmlFor="pieceHeight">Piece Height (optional): </label>
                            <input onChange={this._handleChange} type="text" name="pieceHeight"  />
                        </div>
                        <button>Add Section To Project</button>
                    </form>
                }

            </div>
        )
  }
}