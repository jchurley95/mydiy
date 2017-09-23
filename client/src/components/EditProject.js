import React, { Component } from 'react';
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { Button } from 'react-bootstrap';

export default class NewProject extends Component {
    constructor(){
        super();
        this.state = {
            project: {
                name: '',
                description: ''
            },
            redirect: false
        }
    }

    componentWillMount() {
        const projectId = this.props.match.params.projectId
        this._fetchProject(projectId)       
    }

    _handleChange = (e) => {
        const newState = {...this.state.project};
        newState[e.target.name] = e.target.value;
        this.setState({
            project: newState
        });
    }

    _fetchProject = async (projectId) => {
        try {
            const res = await axios.get(`/api/projects/${projectId}`)
            await this.setState({
                project: {
                    name: res.data.name,
                    description: res.data.description
                }
            })
        }
        catch (err) {
            console.log(err)
        }
    }  

    _editProject = async (e) => {
        e.preventDefault();
        const payload = this.state.project
        const projectId = this.props.match.params.projectId
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
        return (
        <div>
            {this.state.redirect? 
                <Redirect to={`/`}/>
                :
                <form onSubmit={this._editProject}>
                    <div>
                        <label htmlFor="name">Project Name: </label>
                        <input onChange={this._handleChange} type="text" name="name" value={this.state.project.name} required/>
                    </div>
                    <div>
                        <label htmlFor="description">Description: </label>
                        <input onChange={this._handleChange} type="text" name="description" value={this.state.project.description} />
                    </div>
                    <Button>Update Project</Button>
                </form>
            }

            
        </div>
        )
  }
}