import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom'

class ProjectItem extends Component {
  constructor() {
    super();
    this.state = {
      project: {},
      sections: [],
      redirect: false
    };
  }

  componentWillMount() {
    const projectId = this.props.match.params.projectId;
    console.log("projectId in ProjectItem is: " + projectId)
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

  _deleteProject = async (e) => {
    const projectId = this.props.match.params.projectId
      try {
          const res = await axios.delete(`/api/projects/${projectId}`)
          this.setState({redirect: true})
          return res.data
      } catch(err) {
          console.log(err)
      }
  }
 

  render() {
    const projectId = this.props.match.params.projectId;
    return (
      <div>
          {this.state.redirect? 
                <Redirect to={`/`}/>
                :
                <div>
                <img src={this.state.project.projectPictureURL} alt="" />
                <h2>Project Name: {this.state.project.name}</h2>
                <Link to={`/projects/${projectId}/section/new`}><Button>Create New Section</Button></Link>
                {this.state.sections.map(section => (
                    <div key={section.id}>
                        <Link to={`/projects/${this.state.project.id}/sections/${section.id}`}><h4>{section.name}</h4></Link>
                    </div>
                ))}
                <hr />
                <Link to={`/editproject/${projectId}`}><Button>Edit Project</Button></Link>
                <br />
                <br />
                <Button onClick={this._deleteProject}>Delete Project</Button>
            </div>
          }
      </div>
    );
  }
}

export default ProjectItem;