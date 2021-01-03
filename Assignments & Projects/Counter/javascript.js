function GEBID(id) { // name is acronym for Get Element By ID
	return document.getElementById(id);
}

class Counter extends React.Component {
	constructor(props) {
		super(props);
		this.increment = this.increment.bind(this);
		this.decrement = this.decrement.bind(this);
		this.state = {
			count: 0
		}
	}
	increment() {
		this.setState({count: this.state.count+1});
	}
	decrement() {
		this.setState({count: this.state.count-1});
	}
	render() {
		return (
			<div style={styles.counterDiv}>
				<h1>{this.state.count}</h1>
				<button onClick={this.increment}>Increment</button><button onClick={this.decrement}>Decrement</button>
			</div>
		)
	}
}

var styles = {
	counterSection: {
		textAlign: 'center',
		width: '100%'
	},
	counterDiv: {
		border: '2px solid black',
		width: '20%',
		margin: '30px auto'
	},
	counterButton: {
		display: 'inline-block'
	}
}

class CounterApp extends React.Component {
	constructor(props) {
		super(props);
		this.addCounter = this.addCounter.bind(this);
		this.state = {
			counters: []
		}
	}
	addCounter() {
		var counters = this.state.counters;
		counters.push(new Counter);
		this.setState({counters: counters});
	}
	render() {
		var renderedCounters = this.state.counters.map((item) => {
			return <Counter config={item}/>
		})
		return (
			<div><button onClick={this.addCounter}>Add Counter</button>
				<div style={styles.counterSection}>
					{renderedCounters}
				</div>
			</div>
		)
	}
}

ReactDOM.render(<CounterApp />, GEBID('container'));

// function Header(props) {
// 	const {text} = props;
// 	const {style} = props;
// 	return <h1 style={style}>{text}</h1>
// }

// const header = Header({text: 'Vote Your JS Library!', style: {textAlign: 'center'} });

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

// const Libraries = (props) => {
// 	const librarySections = props.items.map((item) => {
// 		return <div style={styles.libraryDiv} key={item.name}>
// 			<Circle name={item.name} number={item.number}/> {item.name} <Plus name={item.name}/>
// 		</div>
// 	});
// 	return librarySections;
// }

// const Circle = (props) => {
// 	return <div style={styles.circle} key={props.name+'Number'}>{props.number}</div>
// }

// const Plus = (props) => {
// 	function onClick() {
// 		alert('You voted for '+props.name+'!')
// 	}
// 	return <button onClick={onClick} style={styles.plus} key={props.name+'Button'}>+</button>
// }

// const libs = Libraries({items: [
// 	{name: 'React', number: 15},
// 	{name: 'Vue', number: 12},
// 	{name: 'Angular', number: 9},
// 	{name: 'Ember', number: 4}
// 	]});

// ReactDOM.render([header, libs], GEBID('container'));