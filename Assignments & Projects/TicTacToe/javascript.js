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

const App = <TicTacToe/>;
ReactDOM.render(App, document.getElementById('container'));

// var styles = {
// 	libraryDiv: {
// 		height: '100px',
// 		width: '50%',
// 		lineHeight: '100px',
// 		border: '3px solid black',
// 		verticalAlign: 'middle',
// 		fontSize: '50px',
// 		margin: '0 auto'
// 	},
// 	circle: {
// 		float: 'left',
// 		margin: '10px',
// 		display: 'inline-block',
// 		width: '80px',
// 		height: '80px',
// 		verticalAlign: 'middle',
// 		lineHeight: '80px',
// 		border: '2px solid black',
// 		borderRadius: '50%',
// 		textAlign: 'center',
// 		fontSize: '50px'
// 	},
// 	plus: {
// 		color: 'green',
// 		fontSize: '75px',
// 		background: 'transparent',
// 		border: 'none',
// 		float: 'right',
// 		margin: '5px',
// 		display: 'inline-block'
// 	}
// }

// class 

// class LibraryVoter extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.vote = this.vote.bind(this);
// 		this.state = {
// 			count: props.startingCount,
// 			name: props.name,
// 		}
// 	}
// 	vote() {
// 		this.setState({count: this.state.count+1});
// 	}
// 	render() {
// 		return (
// 			<div style={styles.libraryDiv} key={this.state.name}>
// 				<Circle name={this.state.name} number={this.state.count}/> {this.state.name} <Plus name={this.state.name} onClick={this.vote}/>
// 			</div>
// 		)
// 	}
// }

// const Libraries = (props) => {
// 	const librarySections = props.items.map((item) => {
// 		return (
// 			<LibraryVoter startingCount={item.number} name={item.name} />
// 		)
// 	});
// 	return librarySections;
// }

// const Circle = (props) => {
// 	return <div style={styles.circle} key={props.name+'Number'}>{props.number}</div>
// }

// function onClick(name) {
// 	alert('You voted for '+name+'!');
// }

// const Plus = (props) => {
// 	return <button onClick={props.onClick} style={styles.plus} key={props.name+'Button'}>+</button>
// }

// const libs = Libraries({items: [
// 	{name: 'React', number: 15},
// 	{name: 'Vue', number: 12},
// 	{name: 'Angular', number: 9},
// 	{name: 'Ember', number: 4}
// 	]});

// ReactDOM.render([header, libs], GEBID('container'));
