import '../node_modules/todomvc-app-css/index.css'
import React from 'react'
import PropTypes from 'prop-types'

const Header = (props) => {
  return (
    <header className={"header"}>
      <h1>todos</h1>
    </header>
  )
}

const NewInput = (props) => {
  return(
    <section id="new-input">
      <input id="new-inputfield" onKeyDown={props.onKeyDown} className={"new-todo"} placeholder={"What needs to be done?"}/>
      <input id="toggle-all" className="toggle-all" type="checkbox" checked={props.isChecked} onChange={props.toggleAll}/>
      <label onChange={props.toggleAll} style={styles.toggleAll} for="toggle-all">></label>
    </section>
  )
}
NewInput.propTypes = {
  onKeyDown: PropTypes.func.isRequired,
  toggleAll: PropTypes.func.isRequired
}

var styles = {
  toggleAll: {
    top: '15px',
    left: '-10px'
  }
}

const TodoItem = (props) => {
  var cls = null;
  if (props.completed) {
    cls = 'completed';
  }
  return(
    <li className={cls} key={props.datakey}>
      <input onChange={props.toggle} datakey={props.datakey} className="toggle" type="checkbox" checked={props.completed}/>
      <label datakey={props.datakey} checked={props.isChecked}>{props.text}</label>
      <button datakey={props.datakey} onClick={props.delete} className="destroy"/>
    </li>
  )
}
TodoItem.propTypes = {
  text: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  datakey: PropTypes.number.isRequired,
  toggle: PropTypes.func.isRequired,
  delete: PropTypes.func.isRequired
}

const Footer = (props) => {
  var counterText = 'items left';
  if (props.count === 1) {
    counterText = 'item left';
  }
  const filters = props.filters.map((item, index) => {
    var selected = null;
    if (item.checksFor == props.currentFilter) {
      selected = 'selected';
    };
    var checkValue = null;
    if(item.checksFor != null) {
      checkValue = item.checksFor.toString();
    }
    return <li><a href="#" className={selected} onClick={props.selectFilter} checksfor={checkValue}>{item.name}</a></li>
  });
  var clear = null;
  if (props.anyComplete) {
    clear = <button class="clear-completed" onClick={props.clearCompleted}>Clear Completed</button>
  }
  return(
    <footer class="footer">
      <span class="todo-count"><strong>{props.count}</strong> {counterText}</span>
      <ul class="filters">
        {filters}
      </ul>
      {clear}
    </footer>
  )
};
Footer.propTypes = {
  count: PropTypes.number.isRequired,
  selectFilter: PropTypes.func.isRequired,
  filters: PropTypes.array.isRequired,
  anyComplete: PropTypes.bool.isRequired,
  clearCompleted: PropTypes.func.isRequired
}

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.newTodo = this.newTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
    this.toggleTodo = this.toggleTodo.bind(this);
    this.checkTopCheckbox = this.checkTopCheckbox.bind(this);
    this.clearCompleted = this.clearCompleted.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
    this.state = {
      todos: [],
      allToggled: true,
      currentFilter: null,
      filters: [
        {name: 'All', checksFor: null},
        {name: 'Active', checksFor: false},
        {name: 'Completed', checksFor: true}
      ]
    }
  }
  newTodo(e) {
    if (e.key === 'Enter') {
      var todoText = e.target.value;
      if (todoText !== '') {
        this.state.todos.push({
          text: todoText,
          completed: false
        })
        this.setState({todos: this.state.todos, allToggled: false});
        document.getElementById("new-inputfield").value = '';
      }
    }
  }
  deleteTodo(e) {
    var datakey = parseInt(e.target.getAttribute("datakey"));
    var newState = this.state.todos;
    newState.splice(datakey, 1);
    this.setState({todos: newState});
    this.setState({allToggled: this.checkTopCheckbox()});
  }
  toggleTodo(e) {
    var datakey = parseInt(e.target.getAttribute("datakey"));
    var newState = this.state.todos;
    newState[datakey].completed = !newState[datakey].completed;
    this.setState({todos: newState});
    this.setState({allToggled: this.checkTopCheckbox()});
  }
  toggleAll(e) {
    var box = document.getElementById('toggle-all');
    var newState = this.state.todos;
    for (var i = 0; i < this.state.todos.length; i++) {
      if (box.checked) {
        newState[i].completed = false;
      } else {
        newState[i].completed = true;
      }
    }
    this.setState({todos: newState});
    this.setState({allToggled: this.checkTopCheckbox()});
  }
  checkTopCheckbox() {
    var result = this.state.todos.every(function(item) {
      return item.completed;
    });
    console.log(result);
    return result;
  }
  applyFilter(e) {
    var newFilter = e.target.getAttribute("checksfor");
    if (newFilter == null) {
      this.setState({currentFilter: null});
    } else {
      this.setState({currentFilter: newFilter == "true"});
    }
  }
  clearCompleted() {
    var newState = [];
    for (var i = 0; i < this.state.todos.length; i++) {
      if (!this.state.todos[i].completed) {
        newState.push(this.state.todos[i]);
      }
    }
    this.setState({todos: newState});
  }
  render() {
    const todos = this.state.todos.filter(item => this.state.currentFilter == null || item.completed == this.state.currentFilter).map((item, index) => {
      return <TodoItem completed={item.completed} datakey={index} key={index} text={item.text} delete={this.deleteTodo} toggle={this.toggleTodo}/>
    });
    const numLeft = this.state.todos.filter( item => !item.completed ).length;
    const anyComplete = this.state.todos.some( item => item.completed );
    var footer = null;
    if (this.state.todos.length > 0) {
      footer = <Footer count={numLeft} filters={this.state.filters} currentFilter={this.state.currentFilter} anyComplete={anyComplete} selectFilter={this.applyFilter} clearCompleted={this.clearCompleted}/>
    }
    return(
      <section className={"todoapp"}>
        <Header/>
        <section className={"main-app"}>
          <NewInput isChecked={!this.state.allToggled} toggleAll={this.toggleAll} onKeyDown={this.newTodo}/>
          <ul className={"todo-list"}>
            {todos}
          </ul>
        </section>
        {footer}
      </section>
    )
  }
}

export default TodoApp;
