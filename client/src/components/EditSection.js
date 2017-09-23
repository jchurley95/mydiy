import React, { Component } from 'react';
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Button } from 'react-bootstrap';

export default class NewProject extends Component {
    constructor(){
        super();
        this.state = {
            section: {
                name: '',
                description: ''
            },
            redirect: false
        }
    }

    componentWillMount() {
        const projectId = this.props.match.params.projectId
        const sectionId = this.props.match.params.projectId
        this._fetchSection(projectId, sectionId)       
    }

    _handleChange = (e) => {
        const newState = {...this.state.project};
        newState[e.target.name] = e.target.value;
        this.setState({
            section: newState
        });
    }

    _fetchSection = async (projectId, sectionId) => {
        try {
            const res = await axios.get(`/api/projects/${projectId}/sections/${sectionId}`)
            await this.setState({
                section: {
                    name: res.data.name,
                    description: res.data.description
                }
            })
        }
        catch (err) {
            console.log(err)
        }
    }  

    _editSection = async (e) => {
        e.preventDefault();
        const payload = this.state.section
        const projectId = this.props.match.params.projectId
        const sectionId = this.props.match.params.sectionId
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
        const projectId = this.props.match.params.projectId;
        const sectionId = this.props.match.params.sectionId;
        return (
        <div>
            {this.state.redirect? 
                <Redirect to={`/projects/${projectId}/sections/${sectionId}`}/>
                :
                <form onSubmit={this._editSection}>
                    <div>
                        <label htmlFor="name">Section Name: </label>
                        <input onChange={this._handleChange} type="text" name="name" value={this.state.section.name} required/>
                    </div>
                    <div>
                        <label htmlFor="description">Description: </label>
                        <input onChange={this._handleChange} type="text" name="description" value={this.state.section.description} />
                    </div>
                    <Button>Update Section</Button>
                </form>
            }

            
        </div>
        )
  }
}