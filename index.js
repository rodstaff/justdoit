import React from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash';

// new class App
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: this.props.todos
    };
  }
  createTask(task) {
    this.state.todos.push({
      task,
      isCompleted: false
    });
    this.setState({todos: this.state.todos});
  }
  toggleTask(task) {
    const foundTodo = this.state.todos.find(todo => todo.task === task);
// const foundTodo = _.find(this.state.todos, todo => todo.task === task);
    foundTodo.isCompleted = !foundTodo.isCompleted;
    this.setState({todos: this.state.todos});
  }
  saveTask(oldTask, newTask) {
//   const foundTodo = _.find(this.state.todos, todo => todo.task === oldTask);
    const foundTodo = this.state.todos.find(todo => todo.task === oldTask);
    foundTodo.task = newTask;
    this.setState({todos: this.state.todos});
  }
  deleteTask(taskToDelete) {
    _.remove(this.state.todos, todo => todo.task === taskToDelete);
    this.setState({todos: this.state.todos});
  }
  render () {
    var myStyle = {
      color: "#088da5",
      fontSize: 30
    }
    return (
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-4 col-sm-offset-4">
            <h2 style={myStyle}>React Todos App</h2>
            <CreateTodo createTask={this.createTask.bind(this)}/>
            &nbsp;
            <TodosList 
              todos={this.state.todos} 
              toggleTask={this.toggleTask.bind(this)}
              saveTask={this.saveTask.bind(this)}
              deleteTask={this.deleteTask.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
}
App.defaultProps = {
  todos: [
    {task:  'exercise',
     isCompleted:  false,
     isEditing: false
    },
    {task: 'eat lunch',
     isCompleted:  false,
     isEditing: false
    },
    {task: 'buy donuts',
     isCompleted:  true,
     isEditing: false
    }
  ]
}

//new class CreateTodo
class CreateTodo extends React.Component {
  handleCreate(e) {
    e.preventDefault();
    this.props.createTask(this.refs.createInput.value);
    this.refs.createInput.value = '';
  }
  render () {
    return (

      <form class="form-inline" onSubmit={this.handleCreate.bind(this)}>
        <input type="text" class="form-control" placeholder="Reminder: To Do List" 
          ref="createInput"/>
        <button type="submit" class="btn btn-primary">Create</button>
      </form>

    );
  }
}
CreateTodo.propTypes = {
  createTask: React.PropTypes.func.isRequired
}

class TodosList extends React.Component {
  renderItems() {
    const props = _.omit(this.props, 'todos');
    return (
      this.props.todos.map((todo, index) => <TodosListItems key={index} {...todo} {...props}/> )
    );
  }
  render () {
    return (
      <div>
        <table>
          <TodosListHeader />
          <tbody>
            {this.renderItems()}
          </tbody>
        </table>
        <TodosListFooter />
      </div>
    );
  }
}
TodosList.propTypes = {
  todos: React.PropTypes.array.isRequired
}
TodosList.defaultProps = {
  todos: []
}


// new class TodosListItem
class TodosListItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: this.props.isEditing
    };
    console.log(this.props.isEditing);
  }
  onSaveClick(e) {
    e.preventDefault();
    const oldTask = this.props.task;
    const newTask = this.refs.editInput.value;
    this.props.saveTask(oldTask, newTask);
    this.setState({ isEditing: false});
  }
  onCancelClick() {
    this.setState({ isEditing: false});
  }
  onEditClick() {
    this.setState({ isEditing: true});
  }
  renderTaskSection() {
    const { task, isCompleted } = this.props;
    const taskStyle = {
      color: isCompleted ? 'green' : 'red',
      cursor: 'pointer'
    };
    if (this.state.isEditing) {
      return (
        <td>
          <form onSubmit={this.onSaveClick.bind(this)}>
            <input type="text" defaultValue={task} ref="editInput" />
          </form>
        </td>
      );
    } return (
      <td style={taskStyle}
        onClick={this.props.toggleTask.bind(this, task)}
      >
        {task}
      </td>
    );
  }
  renderActionsSection() {
    if (this.state.isEditing) {
      return (
        <td>
          <button type="submit" class="btn btn-success btn-sm" onClick={this.onSaveClick.bind(this)}>Save</button>
          <button type="submit" class="btn btn-warning btn-sm" onClick={this.onCancelClick.bind(this)}>Cancel</button>
        </td>
      );
    } return (
        <td>
          <button type="submit" class="btn btn-info btn-sm" onClick={this.onEditClick.bind(this)}>Edit</button>
          <button type="submit" class="btn btn-danger btn-sm" onClick={this.props.deleteTask.bind(this, this.props.task)}>Delete</button>
        </td>
      );
  }
  render () {
    return (
        <tr>
            {this.renderTaskSection()}
            {this.renderActionsSection()}
        </tr>
    );
  }
}
TodosListItems.propTypes = {
  todos: React.PropTypes.array.isRequired,
  toggleTask:  React.PropTypes.func.isRequired,
  saveTask: React.PropTypes.func.isRequired,
  deleteTask: React.PropTypes.func.isRequired
}
TodosListItems.defaultProps = {
  todos: []
}

// new object function
const TodosListHeader = () => {
  return (
    <thead>
      <tr>
        <th>Task</th>
        <th>Action</th>
      </tr>
    </thead>
  );
}

// new object function
const TodosListFooter = () => {
  return (
    <div>
     <p></p>
     <p>Status: Green = "done"; Red = "pending"; Click on task to change status.</p>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));


