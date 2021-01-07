import '../node_modules/todomvc-app-css/index.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
// import $ from '../node_modules/jquery'
// import Popper from '../node_modules/popper.js'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min'
import './App.css'
import React from 'react'
import PropTypes from 'prop-types'

class WorkLogger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formState: {
        project: 'Personal',
        projectErrors: '',
        description: '',
        descriptionErrors: '',
        minutes: 0,
        minutesErrors: ''
      },
      personalItems: [],
      workItems: [],
      personalTime: 0,
      workTime: 0
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);  
  }
  handleChange(e) {
    var key = e.target.getAttribute("name");
    var formState = this.state.formState;
    formState[key] = e.target.value;
    this.setState({formState: formState});
  }
  handleSubmit(e) {
    e.preventDefault();
    var formState = this.state.formState;
    var errors = false;
    if (!(formState.description.length > 4)) {
      formState.descriptionErrors = 'Description must be at least 5 characters.';
      errors = true;
    }
    if (!(formState.minutes >= 0 && formState.minutes <= 240)) {
      formState.minutesErrors = 'Must be between 0 - 240.';
      errors = true;
    }
    if (errors) {
      this.setState({formState: formState});
    } else if (formState.project === 'Personal') {
      var personalItems = this.state.personalItems;
      personalItems.push({description: formState.description, minutes: formState.minutes});
      this.setState({formState: {project:'Personal',projectErrors:'',description:'',descriptionErrors:'',minutes:0,minutesErrors:''}});
    } else if (formState.project === 'Work') {
      var workItems = this.state.workItems;
      workItems.push({description: formState.description, minutes: formState.minutes});
      this.setState({formState: {project:'',projectErrors:'',description:'',descriptionErrors:'',minutes:0,minutesErrors:''}});
    } else {
      formState.projectErrors = 'This project could not be validated.';
      this.setState({formState: formState});
    }
  }
  render() {
    return (
      <div id="WorkLogger">
        <div style={{width: "100vw", textAlign: 'center'}}><h1>Work Logger</h1></div>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <select value={this.state.formState.project} type="text" name="project" onChange={this.handleChange} className="form-control">
                <option value="Personal">Personal</option>
                <option value="Work">Work</option>
              </select><small className="text-danger">{this.state.formState.projectErrors}</small>
              <input value={this.state.formState.description} type="text" name="description" onChange={this.handleChange} className="form-control"/><small className="text-danger">{this.state.formState.descriptionErrors}</small>
              <input value={this.state.formState.minutes} type="number" name="minutes" onChange={this.handleChange} className="form-control"/><small className="text-danger">{this.state.formState.minutesErrors}</small>
            </div>
            <button type="submit" style={{marginBottom: '10px'}} className="btn btn-sm btn-secondary">Submit</button>
          </form>
        <div style={{borderTop: '1px solid black', width: '85vw'}} id="results">
          <TimeSummary position="left" name="Personal" entries={this.state.personalItems}/><TimeSummary position="right" style={{float: 'right'}} name="Work" entries={this.state.workItems}/>
        </div>
      </div>
    )
  }
}

function minutesToTime(min) {
  var m = min % 60;
  var h = (min-m)/60;
  return h.toString() + ":" + (m<10?"0":"") + m.toString();
}

const TimeSummary = (props) => {
  var totalTime = 0;
  const list = props.entries.map((entry, index) => {
    totalTime += parseInt(entry.minutes);
    var timestamp = minutesToTime(entry.minutes)
    return <li key={index}><strong>{timestamp}</strong> {entry.description}</li>
  });
  var totaltimestamp = minutesToTime(totalTime);
  return (
    <div id={props.name+"-section"} style={{float: props.position, border: "1px solid black", display: "inline-block", width: '40%', marginTop: '10px'}}>
      <h5 style={{display: 'inline-block'}}>{props.name}</h5><strong style={{float: 'right'}}>{totaltimestamp}</strong>
      <ul>
        {list}
      </ul>
    </div>
  )
}

TimeSummary.propTypes = {
  entries: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  position: PropTypes.string
}
export default WorkLogger;
