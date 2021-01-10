import React from 'react';

var nextX = true;

const winConditions = [
	[0,1,2],
	[0,3,6],
	[0,4,8],
	[1,4,7],
	[2,5,8],
	[2,4,6],
	[3,4,5],
	[6,7,8]
]

var styles = {
	outerDiv: {
		width: '550px',
		margin: '0 auto'
	},
	square: {
		height: '150px',
		width: '150px',
		// lineHeight: '150px',
		verticalAlign: 'middle',
		display: 'inline-block',
		fontSize: '75px',
		margin: '0px',
		padding: '0px',
		border: '2px solid black',
		fontFamily: 'sans-serif'
	},
	winText: {
		color: 'red'
	}
}

// class GameSquare extends React.Component {
// 	render() {
// 		return <div onClick={this.props.onClick} style={styles.square}><p style={{marginBlockStart: "0.5em"}}>{this.props.symbol}</p></div>
// 	}
// }

const GameSquare = (props) => {
	return <div datakey={props.datakey} onClick={props.onClick} style={styles.square}><p style={{marginBlockStart: "0.5em"}}>{props.symbol}</p></div>
}

class TicTacToe extends React.Component {
	constructor(props) {
		super(props);
		this.testClick = this.testClick.bind(this);
		this.checkWin = this.checkWin.bind(this);
		this.state = {
			gameState: [
				null, null, null,
				null, null, null,
				null, null, null
			],
			win: false,
			winText: null
		}
	}
	checkWin() {
		const currentState = this.state.gameState;
		var winText = null;
		if (winConditions.some(function(condition) {
				var bool = 
					currentState[condition[0]] != null &&
					currentState[condition[1]] != null &&
					currentState[condition[2]] != null &&
					currentState[condition[0]] == currentState[condition[1]] &&
					currentState[condition[1]] == currentState[condition[2]]
				if (bool) {
					winText = currentState[condition[0]] + ' Won!';
				}
				return bool })) {
			this.setState({win: true, winText: winText});
		}
	}
	testClick(data) {
		if (!this.state.win) {
			var index = parseInt(data.target.getAttribute("datakey"));
			if (this.state.gameState[index] === null) {
				var newState = this.state.gameState;
				if (nextX) {
					newState[index] = 'X'
				} else {
					newState[index] = 'O'
				}
				nextX = !nextX;
				this.setState({gameState: newState});
			}
			this.checkWin();
		}
	}
	render() {
		const gameSquares = this.state.gameState.map((item, index) => {
			return (
				<GameSquare onClick={this.testClick} key={index} datakey={index} symbol={item}/>
			)
		});
		return(
			<div style={styles.outerDiv}>
				{gameSquares}
				<h1 style={styles.winText}>{this.state.winText}</h1>
			</div>
		)
	}
}

export default TicTacToe;