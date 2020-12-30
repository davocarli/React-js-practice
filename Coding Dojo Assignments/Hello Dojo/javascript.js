var title = React.createElement('h1', null, 'Hello Dojo!');
var subtitle = React.createElement('h3', null, 'Things I need to do:');
var list = React.createElement('ul', {id: 'list'});

ReactDOM.render([title, subtitle, list], document.getElementById('container'));

var listItems = ['Learn React', 'Climb Mt. Everest', 'Run a marathon', 'Feed the dogs'];

var item0 = React.createElement('li', null, listItems[0]);
var item1 = React.createElement('li', null, listItems[1]);
var item2 = React.createElement('li', null, listItems[2]);
var item3 = React.createElement('li', null, listItems[3]);

ReactDOM.render([item0, item1, item2, item3], document.getElementById('list'));