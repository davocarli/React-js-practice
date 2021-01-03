function GEBID(id) { // name is acronym for Get Element By ID
	return document.getElementById(id);
}

var square = React.createElement('div', { style: { height: '50px', width: '50px', display: 'inline-block' } });

const SquareComponent = (props) => {
	var defaultStyle = {
		height: '300px',
		width: '300px',
		display: 'inline-block',
		fontSize: '50px'
	}
	Object.assign(defaultStyle, props.style);
	return React.createElement('div', {style: defaultStyle}, props.text);
}

var whiteOnBlue = SquareComponent({ text: 'white on blue', style: { backgroundColor: 'blue', color: 'white' } });
var blueOnRed = SquareComponent({ text: 'blue on red', style: { backgroundColor: 'red', color: 'blue' } } );
var greenOnPink = SquareComponent({ text: 'green on pink', style: { backgroundColor: 'pink', color: 'green' } });

ReactDOM.render([whiteOnBlue, blueOnRed, greenOnPink], GEBID('container'));