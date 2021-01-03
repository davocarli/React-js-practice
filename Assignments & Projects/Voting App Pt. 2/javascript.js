function GEBID(id) { // name is acronym for Get Element By ID
	return document.getElementById(id);
}

function Header(props) {
	const {text} = props;
	const {style} = props;
	return <h1 style={style}>{text}</h1>
}

const header = Header({text: 'Vote Your JS Library!', style: {textAlign: 'center'} });

var styles = {
	libraryDiv: {
		height: '100px',
		width: '50%',
		lineHeight: '100px',
		border: '3px solid black',
		verticalAlign: 'middle',
		fontSize: '50px',
		margin: '0 auto'
	},
	circle: {
		float: 'left',
		margin: '10px',
		display: 'inline-block',
		width: '80px',
		height: '80px',
		verticalAlign: 'middle',
		lineHeight: '80px',
		border: '2px solid black',
		borderRadius: '50%',
		textAlign: 'center',
		fontSize: '50px'
	},
	plus: {
		color: 'green',
		fontSize: '75px',
		background: 'transparent',
		border: 'none',
		float: 'right',
		margin: '5px',
		display: 'inline-block'
	}
}

class LibraryVoter extends React.Component {
	constructor(props) {
		super(props);
		this.vote = this.vote.bind(this);
		this.state = {
			count: props.startingCount,
			name: props.name,
		}
	}
	vote() {
		this.setState({count: this.state.count+1});
	}
	render() {
		return (
			<div style={styles.libraryDiv} key={this.state.name}>
				<Circle name={this.state.name} number={this.state.count}/> {this.state.name} <Plus name={this.state.name} onClick={this.vote}/>
			</div>
		)
	}
}

const Libraries = (props) => {
	const librarySections = props.items.map((item) => {
		return (
			<LibraryVoter startingCount={item.number} name={item.name} />
		)
	});
	return librarySections;
}

const Circle = (props) => {
	return <div style={styles.circle} key={props.name+'Number'}>{props.number}</div>
}

function onClick(name) {
	alert('You voted for '+name+'!');
}

const Plus = (props) => {
	return <button onClick={props.onClick} style={styles.plus} key={props.name+'Button'}>+</button>
}

const libs = Libraries({items: [
	{name: 'React', number: 15},
	{name: 'Vue', number: 12},
	{name: 'Angular', number: 9},
	{name: 'Ember', number: 4}
	]});

ReactDOM.render([header, libs], GEBID('container'));
