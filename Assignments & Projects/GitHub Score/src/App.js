import '../node_modules/todomvc-app-css/index.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
// import $ from '../node_modules/jquery'
// import Popper from '../node_modules/popper.js'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min'
import './App.css'
import React from 'react'
// import PropTypes from 'prop-types'
import axios from 'axios'

const baseUrl = 'https://api.github.com/users/'

class GitScoreApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formState: {
        searchTerm: ''
      },
      errorMessage: null,
      score: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit=  this.handleSubmit.bind(this);
  }
  handleChange(e) {
    var key = e.target.getAttribute("name");
    var formState = this.state.formState;
    formState[key] = e.target.value;
    this.setState({formState: formState});
  }
  handleSubmit(e) {
    e.preventDefault();
    var username = this.state.formState.searchTerm;
    if (username !== '') {
      axios.get(baseUrl+username).then( (response) => {
        var score = response.data.public_repos + response.data.followers;
        this.setState({errorMessage: null, score: score});
      }).catch((err) => {
        this.setState({errorMessage: 'User does not exist, pick a different GitHub username'})
      })
    }
  }
  render() {
    return (
      <div id="github-score">
        <div style={{display: 'inline-block', width: '40%', margin: 'auto'}}>
          <GitHubForm onSubmit={this.handleSubmit} onChange={this.handleChange} textValue={this.state.formState.searchTerm}/>
        </div>
        <div style={{display: 'inline-block', width: '40%', margin: 'auto'}}>
          <GitHubScore errorMessage={this.state.errorMessage} score={this.state.score}/>
        </div>
      </div>
    )
  }
}

const GitHubForm = (props) => {
  return (
    <div>
      <h1>GitHub Score</h1>
      <form onSubmit={props.onSubmit}>
        <div className="form-group row">
          <label htmlFor="searchTerm" className="col-sm-4 col-form-label">GitHub Username:</label>
          <div className="col-sm-8">
            <input name="searchTerm" value={props.textValue} onChange={props.onChange} type="text" className="form-control" id="inputPassword"/>
          </div>
        </div>
        <button type="submit" style={{width: '100%'}} className="btn btn-secondary">Calculate my Github Score</button>
      </form>
    </div>
  )
}

const GitHubScore = (props) => {
  if (props.errorMessage !== null) {
    return (
      <h3 className="text-danger">User does not exist, pick a different GitHub username</h3>
    )
  } else if (props.score !== null) {
    var textMessage = null;
    if (props.score < 20) {
      textMessage = <h3 className="text-danger">Needs Work!</h3>
    } else if (props.score < 50) {
      textMessage = <h3 className="text-warning">A decent start!</h3>
    } else if (props.score < 100) {
      textMessage = <h3 className="text-dark">Doing good!</h3>
    } else if (props.score < 200) {
      textMessage = <h3 className="text-success">Great job!</h3>
    } else {
      textMessage = <h3 className="text-primary">Github Elite!</h3>
    }
    return (
      <div style={{textAlign: 'center'}}>
        <h1>Your Score: {props.score}</h1>
        {textMessage}
      </div>
    )
  } else {
    return null;
  }
}

export default GitScoreApp;
