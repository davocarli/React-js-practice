import React from 'react'

// export default class Router {
// 	constructor(app, startingLocation ) {
// 		this.app = app;
// 		// this.routes = routes;
// 		this.location = window.location.pathname;
// 		this.handleChange = this.handleChange.bind(this);

// 		window.addEventListener('popstate', this.handleChange);
// 	}
// 	handleChange() {
// 		this.app.setState({location: this.location});
// 	}
// 	navigate(url, name) {
// 		this.location = url;
// 		if (name === null) {
// 			name = url;
// 		}
// 		window.history.pushState(url, name, window.location.origin+url);
// 		this.handleChange();
// 		return this.location;
// 	}
// 	getLocation() {
// 		return this.location;
// 	}
// }

export class Link extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			path: props.path,
			name: props.name,
			app: props.for
		}
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(e) {
		e.preventDefault();
		window.history.pushState(this.state.path, this.state.name, window.location.origin + this.state.path);
		this.state.app.forceUpdate();
	}
	render() {
		return <a onClick={this.handleClick} href={this.state.path}>{this.state.name}</a>
	}
}

export const Route = (props) => {
	if (props.path === window.location.pathname) {
		return <props.component {...props.props}/>
	} else {
		return null;
	}
}
