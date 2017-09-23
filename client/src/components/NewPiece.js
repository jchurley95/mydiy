import React, { Component } from 'react';
import axios from 'axios'
import { Redirect } from 'react-router-dom'

export default class NewPiece extends Component {
    constructor(){
        super();
        this.state = {
            newPiece: {
                pieceLength: 0.00,
                pieceWidth: 0.00,
                pieceHeight: 0.00,
                pieceLabel: ''
            },
            redirect: false
        }
    }

    _handleChange = (e) => {
        const newState = {...this.state.event};
        newState[e.target.name] = e.target.value;
        this.setState({
            newPiece: newState
        });
    }
    
    _addPieceToSection = async (e) => {
        e.preventDefault();
        const projectId = this.props.match.params.projectId;
        const sectionId = this.props.match.params.sectionId;
        const payload = this.state.newPiece
        const res = await axios.post(`/api/projects/${projectId}/sections/${sectionId}/pieces`, payload)
        this.setState({redirect: true});
    }
      
    render() {
        return (
        <div>
            {this.state.redirect? 
                <Redirect to={`/`}/>
                :
                <form onSubmit={this._addPieceToSection}>
                    <div>
                        <label htmlFor="pieceLabel">Piece Label: </label>
                        <input onChange={this._handleChange} type="text" pieceLabel="name" value={this.state.newSection.name} required/>
                    </div>
                    <div>
                        <label htmlFor="typeOfWood">Type of Wood: </label>
                        <input onChange={this._handleChange} type="text" name="typeOfWood" value={this.state.newSection.description} />
                    </div>
                    <button>Add Piece To Section</button>
                </form>
            }

            
        </div>
        )
  }
}