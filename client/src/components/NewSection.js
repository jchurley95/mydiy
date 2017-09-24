import React, { Component } from 'react';
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Button } from 'react-bootstrap';

export default class NewProject extends Component {
    constructor(){
        super();
        this.state = {
            newSection: {
                name: '',
                description: '',
                project_id: 0
            },
            redirect: false
        }
    }

    _handleChange = (e) => {
        const newState = {...this.state.newSection};
        newState[e.target.name] = e.target.value;
        this.setState({
            newSection: newState
        });
    }
    
    _addSectionToProject = async (e) => {
        e.preventDefault();
        const projectId = this.props.match.params.projectId;
        this.state.newSection.project_id = projectId;
        const payload = this.state.newSection
        console.log(payload)
        const res = await axios.post(`/api/projects/${projectId}/sections`, payload)
        this.setState({redirect: true});
    }
      
    render() {
        const projectId = this.props.match.params.projectId;
        return (
        <div>
            {this.state.redirect? 
                <Redirect to={`/projects/${projectId}`}/>
                :
                <form onSubmit={this._addSectionToProject}>
                    <div>
                        <label htmlFor="name">Section Name: </label>
                        <input onChange={this._handleChange} type="text" name="name" value={this.state.newSection.name} required/>
                    </div>
                    <div>
                        <label htmlFor="description">Description: </label>
                        <input onChange={this._handleChange} type="text" name="description" value={this.state.newSection.description} />
                    </div>
                    <Button onClick={this._addSectionToProject}>Add Section To Project</Button>
                </form>
            }

            
        </div>
        )
  }
}