import React, { Component } from 'react';
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Button } from 'react-bootstrap';

export default class NewPiece extends Component {
    constructor(){
        super();
        this.state = {
            project: {
                projectLengthList: []
            },
            section: {
                sectionLengthsList: []
            },
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

    componentWillMount() {
        const projectId = this.props.match.params.projectId
        console.log("projectId in SectionItem is: " + projectId)
        const sectionId = this.props.match.params.sectionId;
        console.log("sectionId in SectionItem is: " + sectionId)
        this._fetchSection(projectId, sectionId)
        this._fetchProject(projectId);
    }

    _fetchProject = async (projectId) => {
        try {
          const response = await axios.get(`/api/projects/${projectId}`)
          await this.setState({project: response.data});
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
        this._addLengthToSectionList(projectId, sectionId)
    }
    _addLengthToSectionList = async (projectId, sectionId) => {
        console.log(this.state.newPiece.pieceLength);
        this.state.section.sectionLengthsList.push(this.state.newPiece.pieceLength);
        const payload = this.state.section
        console.log(payload.sectionLengthsList);
        console.log(payload);
        try {
            const res = await axios.put(`/api/projects/${projectId}/sections/${sectionId}`, payload)
            this.setState({redirect: true})
            return res.data
        } 
        catch (err) {
            console.log(err)
        }
    }
    _addLengthToProjectList = async (projectId) => {
        console.log(this.state.newPiece.pieceLength);
        this.state.project.projectLengthList.push(this.state.newPiece.pieceLength);
        const payload = this.state.project
        console.log(payload.projectLengthList);
        console.log(payload);
        try {
            const res = await axios.put(`/api/projects/${projectId}`, payload)
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
                    <form onSubmit={this._addPieceToSection}>
                        <div>
                            <label htmlFor="pieceLabel">Piece Label: </label>
                            <input onChange={this._handleChange} type="text" name="pieceLabel"  required/>
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
                        <Button onClick={this._addPieceToSection}>Add Piece</Button>
                    </form>
                }

            </div>
        )
  }
}