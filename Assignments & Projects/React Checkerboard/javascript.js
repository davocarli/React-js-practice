function GEBID(id) { // name is acronym for Get Element By ID
	return document.getElementById(id);
}

function CheckerBoard(props) {
	rows = [];
	for (i = 0; i < props.rows; i++) {
		rows.push(Row(Object.assign(props, {rowNumber: i})));
	}
	return React.createElement('div', null, rows);
}
function Row(props) {
	cells = [];
	for (j = 0; j < props.rows; j++) {
		var num = props.rows + props.rowNumber + j;
		if (num % 2 == 0) { // Is even
			cell = Cell({style: styles.colorA});
			cells.push(cell);
		} else { // is odd
			cell = Cell({style: styles.colorB});
			cells.push(cell);
		}
	}
	for (j = 0; j < cells.length; j++) {
	}
	return React.createElement('div', {style: styles.row}, cells);
}
function Cell(props) {
	return new React.createElement('div', {style: Object.assign(props.style, styles.cell)});
}

var styles = {
	row: {height: '20px'},
	cell: {height: '20px', width: '20px', display: 'inline-block'},
	colorA: {backgroundColor: 'black'},
	colorB: {backgroundColor: 'red'}
}

function createCheckerboard() {
	num = parseInt(document.getElementById('number').value);
	if (!Number.isNaN(num) && num > 0) {
		ReactDOM.render(CheckerBoard({rows: num}), GEBID('container'));
	}
}