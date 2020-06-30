import axios from 'axios'
import React, { Component } from 'react'
import {Form, FormControl, FormGroup, ControlLabel, HelpBlock, Checkbox, Radio, Button} from 'react-bootstrap';

class NewProject extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      description: '',
      errs: []
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.hasErrorFor = this.hasErrorFor.bind(this)
    this.renderErrorFor = this.renderErrorFor.bind(this)
  }

  handleInputChange(event){
    
    this.setState({
      [event.target.name] : event.target.value
    },console.log(this.state));
    
  }

  handleSubmit(event){
    event.preventDefault()
    const {history} = this.props

    const project = {
      name: this.state.name,
      description: this.state.description
    }

    axios.post('/api/projects', project)
          .then(response => {
            history.push('/')
          })
          .catch(error => {
            this.setState({
              errs: error.response.data.errors
            })
          })
  }
  
  hasErrorFor(field)
  {
    return !!this.state.errs[field]
  }

  renderErrorFor(field)
  {
    if(this.hasErrorFor(field)){
      return (<div className="alert alert-danger">
                <strong>{this.state.errs[field][0]}</strong>
              </div>)
    }
  }

  render () {
    const {name, description, errs} = this.state
    return <div className="container py-4">
              <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                <div className="row justify-content-center">
                  <div className="card" style={{width: '32rem'}}>
                    <div className="card-header">Create new project</div>
                    <div className="card-body">
                      <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                          <Form.Label>Project name</Form.Label>
                          <Form.Control type="text" name="name" placeholder="Enter project name" onChange={this.handleInputChange} />
                          {/* <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                          </Form.Text> */}
                        </Form.Group>
                        {this.renderErrorFor('name')}
                        <Form.Group controlId="formBasicPassword">
                          <Form.Label>Project description</Form.Label>
                          <Form.Control as="textarea" name="description" type="text" placeholder="Project description" onChange={this.handleInputChange} />
                        </Form.Group>
                        {this.renderErrorFor('description')}
                        <Button variant="primary" type="submit">
                          Submit
                        </Button> 
                      </Form> 
                    </div>
                  </div>
                </div>
              </div>
          </div>
  }
}

export default NewProject