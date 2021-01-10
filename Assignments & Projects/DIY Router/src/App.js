import '../node_modules/todomvc-app-css/index.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
// import $ from '../node_modules/jquery'
// import Popper from '../node_modules/popper.js'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min'
import './App.css'
import React from 'react'
// import PropTypes from 'prop-types'
import axios from 'axios'

class DIYRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 5
    }
    this.handleClick = this.handleClick.bind(this);
    this.coffeescript = this.coffeescript.bind(this);
    this.onURLChange = this.onURLChange.bind(this);
    window.addEventListener('popstate', this.onURLChange);
  }
  onURLChange(e) {
    this.forceUpdate();
  }
  handleClick(e) {
    e.preventDefault();
    const url = e.target.getAttribute("href");
    const name = e.target.innerHTML;
    window.history.pushState(url, name, window.location.origin + '/' + url);
    if (url == 'coffeescript') {
      this.coffeescript();
    }
    this.setState({counter: 5});
  }
  coffeescript() {
    var countdown = setInterval(() => {
      if (window.location.pathname !== '/coffeescript') {
        this.setState({counter: 5});
      } else  if (this.state.counter <= 1) {
        clearInterval(countdown);
        window.history.pushState('javascript', 'JavaScript', window.location.origin + '/javascript');
        this.setState({counter: 5});
      } else {
        this.setState({counter: this.state.counter-1});
      }
    }, 1000);
  }
  render() {
    var text = null;
    const currentLocation = window.location.pathname;
    if (currentLocation === '/javascript') {
      text = <p>A high-level, dynamic, untyped, and interpreted programming language.</p>
    } else if (currentLocation === '/haskell') {
      text = <p>A standardized, general-purpose purely functionaly programming language, with non-strict semantics and strong static typing.</p>
    } else if (currentLocation === '/coffeescript') {
      text = <p>CoffeeScript is a programming language that transcompiles to JavaScript, so we'll be redirecting back to JavaScript in <span class="text-danger">{this.state.counter}</span>.</p>
    }
    return(
      <div className="RouterApp">
        <ul style={{fontSize: '50px', textAlign: 'left'}}>
          <li><a onClick={this.handleClick} href="javascript">JavaScript</a></li>
          <li><a onClick={this.handleClick} href="haskell">Haskell</a></li>
          <li><a onClick={this.handleClick} href="coffeescript">CoffeeScript</a></li>
        </ul>
        <div style={{display: 'block', borderTop: '2px solid black', width: '90%'}}>
            {text}
        </div>
      </div>
    )
  }
}

// const baseUrl = 'https://api.github.com/users/'

// class GitScoreApp extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       formState: {
//         searchTerm: ''
//       },
//       errorMessage: null,
//       score: null
//     }
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit=  this.handleSubmit.bind(this);
//   }
//   handleChange(e) {
//     var key = e.target.getAttribute("name");
//     var formState = this.state.formState;
//     formState[key] = e.target.value;
//     this.setState({formState: formState});
//   }
//   handleSubmit(e) {
//     e.preventDefault();
//     var username = this.state.formState.searchTerm;
//     if (username !== '') {
//       axios.get(baseUrl+username).then( (response) => {
//         var score = response.data.public_repos + response.data.followers;
//         this.setState({errorMessage: null, score: score});
//       }).catch((err) => {
//         this.setState({errorMessage: 'User does not exist, pick a different GitHub username'})
//       })
//     }
//   }
//   render() {
//     return (
//       <div id="github-score">
//         <div style={{display: 'inline-block', width: '40%', margin: 'auto'}}>
//           <GitHubForm onSubmit={this.handleSubmit} onChange={this.handleChange} textValue={this.state.formState.searchTerm}/>
//         </div>
//         <div style={{display: 'inline-block', width: '40%', margin: 'auto'}}>
//           <GitHubScore errorMessage={this.state.errorMessage} score={this.state.score}/>
//         </div>
//       </div>
//     )
//   }
// }

// const GitHubForm = (props) => {
//   return (
//     <div>
//       <h1>GitHub Score</h1>
//       <form onSubmit={props.onSubmit}>
//         <div className="form-group row">
//           <label htmlFor="searchTerm" className="col-sm-4 col-form-label">GitHub Username:</label>
//           <div className="col-sm-8">
//             <input name="searchTerm" value={props.textValue} onChange={props.onChange} type="text" className="form-control" id="inputPassword"/>
//           </div>
//         </div>
//         <button type="submit" style={{width: '100%'}} className="btn btn-secondary">Calculate my Github Score</button>
//       </form>
//     </div>
//   )
// }

// const GitHubScore = (props) => {
//   if (props.errorMessage !== null) {
//     return (
//       <h3 className="text-danger">User does not exist, pick a different GitHub username</h3>
//     )
//   } else if (props.score !== null) {
//     var textMessage = null;
//     if (props.score < 20) {
//       textMessage = <h3 className="text-danger">Needs Work!</h3>
//     } else if (props.score < 50) {
//       textMessage = <h3 className="text-warning">A decent start!</h3>
//     } else if (props.score < 100) {
//       textMessage = <h3 className="text-dark">Doing good!</h3>
//     } else if (props.score < 200) {
//       textMessage = <h3 className="text-success">Great job!</h3>
//     } else {
//       textMessage = <h3 className="text-primary">Github Elite!</h3>
//     }
//     return (
//       <div style={{textAlign: 'center'}}>
//         <h1>Your Score: {props.score}</h1>
//         {textMessage}
//       </div>
//     )
//   } else {
//     return null;
//   }
// }

export default DIYRouter;
