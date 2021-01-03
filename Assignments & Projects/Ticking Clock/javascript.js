// SOLUTION 1 - vanilla js
function updateTime() {
	document.getElementById('time').innerHTML = 'The time is: ' + (new Date().toLocaleTimeString('en-Us'));
}
var interval = window.setInterval(updateTime, 500);

// SOLUTION 2 - with react
function renderTime() {
	var time = React.createElement('h2', null, 'The time is: ' + (new Date().toLocaleTimeString('en-US')));
	ReactDOM.render(time, document.getElementById('container'));
}

var interval = window.setInterval(renderTime, 500);