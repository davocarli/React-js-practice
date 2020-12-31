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

const Libraries = (props) => {
	const librarySections = props.items.map((item) => {
		return <div style={styles.libraryDiv} key={item.name}>
			<Circle name={item.name} number={item.number}/> {item.name} <Plus name={item.name}/>
		</div>
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
	function onClick() {
		alert('You voted for '+props.name+'!')
	}
	return <button onClick={onClick} style={styles.plus} key={props.name+'Button'}>+</button>
}

const libs = Libraries({items: [
	{name: 'React', number: 15},
	{name: 'Vue', number: 12},
	{name: 'Angular', number: 9},
	{name: 'Ember', number: 4}
	]});

ReactDOM.render([header, libs], GEBID('container'));

// function CheckerBoard(props) {
// 	rows = [];
// 	for (i = 0; i < props.rows; i++) {
// 		rows.push(Row(Object.assign(props, {rowNumber: i})));
// 	}
// 	return React.createElement('div', null, rows);
// }
// function Row(props) {
// 	cells = [];
// 	for (j = 0; j < props.rows; j++) {
// 		var num = props.rows + props.rowNumber + j;
// 		if (num % 2 == 0) { // Is even
// 			cell = Cell({style: styles.colorA});
// 			cells.push(cell);
// 		} else { // is odd
// 			cell = Cell({style: styles.colorB});
// 			cells.push(cell);
// 		}
// 	}
// 	for (j = 0; j < cells.length; j++) {
// 	}
// 	return React.createElement('div', {style: styles.row}, cells);
// }
// function Cell(props) {
// 	return new React.createElement('div', {style: Object.assign(props.style, styles.cell)});
// }

// var styles = {
// 	row: {height: '20px'},
// 	cell: {height: '20px', width: '20px', display: 'inline-block'},
// 	colorA: {backgroundColor: 'black'},
// 	colorB: {backgroundColor: 'red'}
// }

// function createCheckerboard() {
// 	num = parseInt(document.getElementById('number').value);
// 	if (!Number.isNaN(num) && num > 0) {
// 		ReactDOM.render(CheckerBoard({rows: num}), GEBID('container'));
// 	}
// }