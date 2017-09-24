import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


class ProjectList extends Component {
  constructor(){
    super();
    this.state = {
      error: '',
      projects: []
    }
  }

  componentWillMount(){
    this._fetchProjects();
  }

  _fetchProjects = async () => {
    try {
      const res = await axios.get('/api/projects');
      await this.setState({projects: res.data});
      return res.data;
    }
    catch (err) {
      console.log(err)
      await this.setState({error: err.message})
      return err.message
    }
    
  }

  render() {
    if (this.state.error){
      return <div>{this.state.error}</div>
    }
    return (
      <div>
        <h2>All Projects</h2>
        {this.state.projects.map(project => (
          <div key={project.id}>
            <Link to={`/projects/${project.id}`} >{project.name}</Link> 
          </div>
        ))}
      </div>
    );
  }
}

export default ProjectList;