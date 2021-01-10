import '../node_modules/todomvc-app-css/index.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min'
import './App.css'
import React from 'react'
import {Link, Route} from './Router.js'
// import 'react-router';
// import {
//   BrowserRouter,
//   Route,
//   Link
// } from 'react-router-dom'

class DIYRouter extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div className="RouterApp">
        <ul style={{fontSize: '50px', textAlign: 'left'}}>
          <li><Link for={this} path="/javascript" name="JavaScript"/></li>
          <li><Link for={this} path="/haskell" name="Haskell"/></li>
          <li><Link for={this} path="/coffeescript" name="CoffeeScript"/></li>
        </ul>
        <div style={{display: 'block', borderTop: '2px solid black', width: '90%'}}>
            <Route path="/javascript" component={JSDescription}/>
            <Route path="/haskell" component={HaskellDescription}/>
            <Route path="/coffeescript" component={CoffeeDescription} props={{app: this}}/>
        </div>
      </div>
    )
  }
}

const JSDescription = (props) => {
  return (
    <p>A high-level, dynamic, untyped, and interpreted programming language.</p>
  )
}

const HaskellDescription = (props) => {
  return (
    <p>A standardized, general-purpose purely functionaly programming language, with non-strict semantics and strong static typing.</p>
  )
}

class CoffeeDescription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 5,
      app: props.app
    }
    this.countdown = this.countdown.bind(this);
    this.countdown();
  }
  countdown() {
    var change = setInterval(() => {
      if (this.state.counter > 1) {
        this.setState({counter: this.state.counter-1});
      } else {
        clearInterval(change);
        window.history.pushState('/javascript', 'JavaScript', window.location.origin+'/javascript');
        this.state.app.forceUpdate();
      }
    }, 1000);
  }
  render() {
    return (
      <p>CoffeeScript is a programming language that transcompiles to JavaScript, so we'll be redirecting back to JavaScript in <span className="text-danger">{this.state.counter}</span>.</p>
    )
  }
}

export default DIYRouter;
