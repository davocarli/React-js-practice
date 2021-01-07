import '../node_modules/todomvc-app-css/index.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
// import $ from '../node_modules/jquery'
// import Popper from '../node_modules/popper.js'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min'
import './App.css'
import React from 'react'
// import PropTypes from 'prop-types'

class ValidatedForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.validateInput = this.validateInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      name: '',
      nameError: null,
      email: '',
      emailError: null,
      submitted: false
    }
  }
  handleChange(e) {
    var key = e.target.getAttribute("name");
    console.log(key);
    var newState = this.state;
    newState[key] = e.target.value;
    this.setState(newState);
  }
  validateInput() {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.state.email) && this.state.name.length > 8) {
      return true;
    }
    return false;
  }
  handleSubmit(e) {
    e.preventDefault();
    if (this.validateInput()) {
      this.setState({
        submitted: true
      })
    } else {
      var newState = {}

      if (!(this.state.name.length > 8)) {
        newState['nameError'] = 'Name must be at least 8 characters.';
      } 
      if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.state.email))) {
        newState['emailError'] = 'Please enter a valid email address.';
      }
      this.setState(newState);
    }
  }
  render() {
    const isEnabled=this.validateInput();
    var form = null;
    if (!this.state.submitted) {
      form = 
        <form onSubmit={this.handleSubmit} style={{width: '75%'}}>
          <div class="form-group">
          <input value={this.state.name} isInvalid={this.state.nameError !== null} type="text" name="name" onChange={this.handleChange} class="form-control" placeholder="name"/><small class="text-danger">{this.state.nameError}</small>
          <input value={this.state.email} isInvalid={this.state.emailError !== null} name="email" class="form-control" onChange={this.handleChange} placeholder="email"/><small class="text-danger">{this.state.emailError}</small>
          </div>
          <button type="submit" disabled={!isEnabled} class="btn btn-primary">Submit</button>
        </form>
    } else {
      form = <h3>Thanks!</h3>
    }
    return (
      <div id="formApp">
        <h1>Validated Form</h1>
        {form}
      </div>
    )
  }
}

export default ValidatedForm;
