import React, { Component } from 'react';
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Button } from 'react-bootstrap';

export default class EditPiece extends Component {
    constructor(){
        super();
        this.state = {
            piece: {
                pieceLabel: '',
                pieceLength: 0,
                pieceWidth: 0,
                pieceHeight: 1
            },
            redirect: false
        }
    }

    componentWillMount() {
        const projectId = this.props.match.params.projectId
        const sectionId = this.props.match.params.projectId
        const pieceId = this.props.match.params.pieceId
        this._fetchPiece(projectId, sectionId, pieceId)       
    }

    _handleChange = (e) => {
        const newState = {...this.state.piece};
        newState[e.target.pieceLabel] = e.target.value;
        this.setState({
            piece: newState
        });
    }

    _fetchPiece = async (projectId, sectionId, pieceId) => {
        try {
            const res = await axios.get(`/api/projects/${projectId}/sections/${sectionId}/pieces/${pieceId}`)
            await this.setState({
                piece: {
                    pieceLabel: res.data.pieceLabel,
                    pieceLength: res.data.pieceLength,
                    pieceWidth: res.data.pieceWidth,
                    pieceHeight: res.data.pieceHeight
                }
            })
        }
        catch (err) {
            console.log(err)
        }
    }  

    _editPiece = async (e) => {
        e.preventDefault();
        const payload = this.state.piece
        const projectId = this.props.match.params.projectId
        const sectionId = this.props.match.params.sectionId
        const pieceId = this.props.match.params.pieceId
        try {
            const res = await axios.put(`/api/projects/${projectId}/sections/${sectionId}/pieces/${pieceId}`, payload)
            this.setState({redirect: true})
            return res.data
        } 
        catch (err) {
            console.log(err)
        }
    }
      
    render() {
        const projectId = this.props.match.params.projectId;
        const sectionId = this.props.match.params.sectionId;
        return (
            <div>
                
                {this.state.redirect? 
                    <Redirect to={`/projects/${projectId}/sections/${sectionId}`}/>
                    :
                    <form onSubmit={this._editPiece}>
                        <div>
                            <label htmlFor="pieceLabel">Piece Label: </label>
                            <input onChange={this._handleChange} type="text" pieceLabel="pieceLabel"  value={this.state.piece.pieceLabel} required/>
                        </div>
                        <div>
                            <label htmlFor="pieceLength">Length: </label>
                            <input onChange={this._handleChange} type="text" name="pieceLength" value={this.state.piece.pieceLength} required/>
                        </div>
                        <div>
                            <label htmlFor="pieceWidth">Width: </label>
                            <input onChange={this._handleChange} type="text" name="pieceWidth"  value={this.state.piece.pieceWidth} required/>
                        </div>
                        <div>
                            <label htmlFor="pieceHeight">Piece Height (optional): </label>
                            <input onChange={this._handleChange} type="text" name="pieceHeight"  value={this.state.piece.pieceHeight}/>
                        </div>
                        <Button onClick={this._editPiece}>Update Piece</Button>
                        
                    </form>
                }

            </div>
        )
  }
}