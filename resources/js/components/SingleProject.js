import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class SingleProject extends Component {
    constructor(props){
        super(props)
        this.state = {
            project: {},
            tasks: [],
            title: '',
            errors: []
        }
        this.handleMarkProjectAsComplete = this.handleMarkProjectAsComplete.bind(this)
        this.handleMarkTaskAsComplete = this.handleMarkTaskAsComplete.bind(this)
        this.handleChangeField = this.handleChangeField.bind(this)
        this.handleAddNewTask = this.handleAddNewTask.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
    }

    componentDidMount(){
        const projectId = this.props.match.params.id

        axios.get(`/api/projects/${projectId}`)
                .then(result => {
                    this.setState({
                        project: result.data,
                        tasks: result.data.tasks
                    })
                })
    }

    handleMarkProjectAsComplete(){
        const {history} = this.props

        axios.put(`/api/projects/${this.state.project.id}`)
                .then(response => history.push('/'))
    }

    handleMarkTaskAsComplete(event, task_id){
        const {history} = this.props

        axios.put(`/api/tasks/${task_id}`)
                .then(response => {this.setState({
                    tasks: response.data.tasks
                })
                })
    }
    
    handleChangeField(event)
    {
        this.setState({
            title: event.target.value
        }, console.log(this.state.title))
    }

    handleAddNewTask(event)
    {
        event.preventDefault();
        
        const task = {
            title: this.state.title,
            project_id: this.state.project.id
        }

        axios.post(`/api/tasks`,task)
                .then(response => {
                    this.setState({
                        title: ''
                    })
                    this.setState(prevState => ({
                        tasks: prevState.tasks.concat(response.data)
                    }),console.log("add"))
                })
                .catch(error => {
                    this.setState({
                      errors: error.response.data.errors
                    })
                  })
    }
    
    hasErrorFor(field)
    {
      return !!this.state.errors[field]
    }
  
    renderErrorFor(field)
    {
      if(this.hasErrorFor(field)){
        return (<div className="alert alert-danger">
                  <strong>{this.state.errors[field][0]}</strong>
                </div>)
      }
    }
    render(){
        const {project, tasks} = this.state
        return <div className="container py-4">
                    <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                        <div className="row justify-content-center">
                            <div className="card" style={{width: '32rem'}}>
                                <div className="card-header container-fluid">
                                    <div className="row">
                                        <div className="col-md-9 mt-2">
                                            <h4>{project.name}</h4>
                                        </div>
                                        <div className="col-md-3 float-right">
                                            <button className="btn btn-primary ml-1" onClick={this.handleMarkProjectAsComplete} >Complete</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={this.handleAddNewTask}>
                                        <div className='input-group'>
                                            <input
                                            type='text'
                                            name='title'
                                            className={`form-control ${this.hasErrorFor('title') ? 'is-invalid' : ''}`}
                                            placeholder='Task title'
                                            value={this.state.title}
                                            onChange={this.handleChangeField}
                                            />
                                            <div className='input-group-append'>
                                            <button className='btn btn-primary'>Add</button>
                                            </div>
                                            {this.renderErrorFor('title')}
                                        </div>
                                    </form>

                                    <hr/>
                                    <ul className="list-group mt-1">
                                        {tasks.map((t, index) => (
                                            <li key={index} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center border-0"
                                            >
                                                {t.title}
                                                {t.is_completed == 1 ? 
                                                        <span className="badge badge-success ml-1 mr-1 float-right">Completed</span> 
                                                : ''}
                                                <button
                                                    className='btn btn-primary btn-sm'
                                                    onClick={(e) => {this.handleMarkTaskAsComplete(e, t.id)}}
                                                    >
                                                    Mark as completed
                                                </button>
                                            </li>
                                        ))}                                        
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    }
}