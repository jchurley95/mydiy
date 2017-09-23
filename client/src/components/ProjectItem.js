import React, { Component } from 'react';
import axios from 'axios';

class ProjectItem extends Component {
  constructor() {
    super();
    this.state = {
      project: {},
      sections: [],
    };
  }

  componentWillMount() {
    const projectId = this.props.match.params.id;
    this._fetchProject(projectId)
    this._fetchSections(projectId)
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

  _fetchSections = async (projectId) => {
    try {
      const response = await axios.get(`/api/projects/${projectId}/sections`)
      await this.setState({sections: response.data});
      return response.data;
    }
    catch (err) {
      await this.setState({error: err.message})
      return err.message
    }
  } 

  render() {
    return (
      <div>
        <img src={this.state.project.projectPictureURL} alt="" />
        <h1>{this.state.project.name}</h1>
        {this.state.sections.map(section => (
          <div key={section.id}>
            <h4>{section.name}</h4>
          </div>
        ))}
      </div>
    );
  }
}

export default ProjectItem;