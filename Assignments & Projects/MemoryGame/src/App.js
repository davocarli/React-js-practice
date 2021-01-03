import '../node_modules/todomvc-app-css/index.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
// import $ from '../node_modules/jquery'
// import Popper from '../node_modules/popper.js'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min'
import './App.css'
import React from 'react'
// import PropTypes from 'prop-types'

const Header = (props) => {
  return (
    <header>
      <h1>Memory Game</h1>
      <h5>Current Streak: <strong>{props.currentScore}</strong> Highest Streak: <strong>{props.highScore}</strong></h5>
    </header>
  )
}

const MemorySquare = (props) => {
  var color = 'lightgrey';
  if (props.color === 'selected') {
    color = 'lightblue'
  } else if (props.color === 'correct') {
    color = 'lightgreen'
  } else if (props.color === 'incorrect') {
    color = 'pink'
  } else if (props.color === 'missed') {
    color = 'lightyellow'
  }
  return (
    <div onClick={props.onClick} datakey={props.datakey} className="memory-square" style={{backgroundColor: color}}/>
  )
}

class MemoryGame extends React.Component {
  constructor(props) {
    super(props);
    this.startGame = this.startGame.bind(this);
    this.memorize = this.memorize.bind(this);
    this.startSelection = this.startSelection.bind(this);
    this.selectSquare = this.selectSquare.bind(this);
    this.compareSelection = this.compareSelection.bind(this);
    this.state = {
      currentScore: 0,
      highScore: 0,
      chance: 40,
      currentState: 'Not Started',
      footerMessage: null,
      currentGrid: [
        null, null, null, null,
        null, null, null, null,
        null, null, null, null
      ],
      userSelections: [
        null, null, null, null,
        null, null, null, null,
        null, null, null, null
      ]
    }
  }
  startGame() {
    var counter = 3;
    var app = this;
    this.setState({
      currentGrid: [
        null, null, null, null,
        null, null, null, null,
        null, null, null, null
      ],
      userSelections: [
        null, null, null, null,
        null, null, null, null,
        null, null, null, null
      ]
    })
    var countdown = setInterval(function() {
      if (counter > 0) {
        app.setState({
          currentState: 'Countdown',
          footerMessage: <span>Get ready to memorize cells in <strong>{counter}</strong></span>
        });
        counter -= 1;
      } else {
        clearInterval(countdown);
        app.memorize();
      }
    }, 1000);
  }
  memorize() {
    var newGrid = this.state.currentGrid;
    for (var i = 0; i < newGrid.length; i++) {
      if (Math.floor(Math.random() * 100) < this.state.chance) {
        newGrid[i] = 'selected';
      }
    }
    this.setState({
      currentState: 'Memorizing',
      currentGrid: newGrid,
    })
    setTimeout(this.startSelection, 3000);
  }
  startSelection() {
    this.setState({
      currentState: 'Selecting'
    })
    setTimeout(this.compareSelection, 3000);
  }
  selectSquare(e) {
    var idx = e.target.getAttribute("datakey");
    var newGrid = this.state.userSelections;
    if (newGrid[idx] !== null) {
      newGrid[idx] = null;
    } else {
      newGrid[idx] = 'selected'
    }
    this.setState({
      userSelections: newGrid
    })
  }
  compareSelection() {
    var newGrid = this.state.currentGrid;
    var allCorrect = true;
    for (var i = 0; i < newGrid.length; i++) {
      if (this.state.userSelections[i] === null && newGrid[i] === 'selected') {
        allCorrect = false;
        newGrid[i] = 'missed'
      } else if (this.state.userSelections[i] === 'selected' && newGrid[i] === 'selected') {
        newGrid[i] = 'correct'
      } else if (this.state.userSelections[i] === 'selected' && newGrid[i] === null) {
        allCorrect = false;
        newGrid[i] = 'incorrect'
      }
    }
    if (allCorrect) {
      this.setState({
        currentScore: this.state.currentScore + 1,
        highScore: Math.max(this.state.currentScore+1, this.state.highScore)
      })
    } else {
      this.setState({
        currentScore: 0
      })
    }
    this.setState({
      currentGrid: newGrid,
      currentState: 'Not Started',
    })
  }
  render() {
    var memorySquares = null;
    if (this.state.currentState !== 'Selecting') {
      memorySquares = this.state.currentGrid.map((item, index) => {
        return <MemorySquare onClick={null} key={index} datakey={index} color={item}/>
      });
    } else {
      memorySquares = this.state.userSelections.map((item, index) => {
        return <MemorySquare onClick={this.selectSquare} key={index} datakey={index} color={item}/>
      })
    }
    var footer = null;
    if (this.state.currentState === 'Not Started') {
      footer = <button className="btn btn-light" onClick={this.startGame}>Start Game</button>
    } else {
      footer = <h4>{this.state.footerMessage}</h4>
    }
    return (
      <div id="memory-game">
        <Header currentScore={this.state.currentScore} highScore={this.state.highScore}/>
        {memorySquares}
        {footer}
      </div>
    )
  }
}

export default MemoryGame;
