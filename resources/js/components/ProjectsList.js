import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ProjectsList extends Component {
  constructor(props){
    super(props);
    this.state = {
      projects: []
    }
  }

  componentDidMount()
  {
    axios.get('/api/projects')
          .then(response => {
            this.setState({
              projects : response.data
            })
          })
  }

  render()
  {
    const {projects} = this.state;
    console.log(projects);
    return (<div className="container py-4">
              <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                <div className="row justify-content-center">
                  <div className="card" style={{width: '32rem'}}>
                    <div className="card-header">All Project</div>
                    <div className="card-body">
                      <Link to="/create" className="btn btn-primary mb-3">Card link</Link>
                      <ul className="list-group mt-1">
                        {projects && projects.map((p  , index) => (
                          <Link key={index} to={`/${p.id}`} className="ist-group-item list-group-item-action d-flex justify-content-between align-items-center">
                          {p.name}
                          <div>
                            {index == 0 ? <span className="badge badge-danger ml-1 mr-1">New</span> :''}
                            <span className="badge badge-primary">{p.tasks_count}</span>
                          </div>
                          </Link>
                        ))}
                          
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
          </div>)
    
  }
}

export default ProjectsList