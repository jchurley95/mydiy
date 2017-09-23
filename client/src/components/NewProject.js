import React, { Component } from 'react';
import axios from 'axios'
import { Redirect } from 'react-router-dom'

export default class NewProject extends Component {
    constructor(){
        super();
        this.state = {
            project: {},
            redirect: false
        }
    }

    _handleChange = (e) => {
        const newState = {...this.state.project};
        newState[e.target.name] = e.target.value;
        this.setState({
            project: newState
        });
    }
    
    _addProject = async (e) => {
        e.preventDefault();
        const payload = this.state.project
        const res = await axios.post('/api/projects', payload)
        this.setState({redirect: true});
    }
      
    render() {
        return (
        <div>
            {this.state.redirect? 
                <Redirect to={`/`}/>
                :
                <form onSubmit={this._addProject}>
                    <div>
                        <label htmlFor="name">Project Name: </label>
                        <input onChange={this._handleChange} type="text" name="name" value={this.state.project.name} required/>
                    </div>
                    <div>
                        <label htmlFor="description">Description: </label>
                        <input onChange={this._handleChange} type="text" name="description" value={this.state.project.description} />
                    </div>
                    <button>Start Building!</button>
                </form>
            }

            
        </div>
        )
  }
}