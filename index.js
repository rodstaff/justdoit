import React from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash';

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
    return (
      <div>
        <h2>React ToDos App</h2>
        <CreateTodo createTask={this.createTask.bind(this)}/>
        <TodosList 
          todos={this.state.todos} 
          toggleTask={this.toggleTask.bind(this)}
          saveTask={this.saveTask.bind(this)}
          deleteTask={this.deleteTask.bind(this)}
        />
      </div>
    );
  }
}
App.defaultProps = {
  todos: [
    {task:  'exercise a lot',
     isCompleted:  false
    },
    {task: 'eat dinner',
     isCompleted:  true
    }
  ]
}

class CreateTodo extends React.Component {
  handleCreate(event) {
    event.preventDefault();
    this.props.createTask(this.refs.createInput.value);
    this.refs.createInput.value = '';
  }
  render () {
    return (
      <form onSubmit={this.handleCreate.bind(this)}>
        <input type="text" placeholder="Reminder: To Do List" 
          ref="createInput"/>
        <button>Create</button>
      </form>
    );
  }
}
CreateTodo.defaultProps = {
  createTask: React.PropTypes.func.isRequired
}

class TodosList extends React.Component {
  renderItems() {
    const props = _.omit(this.props, 'todos');
    return (
    this.props.todos.map((todo, index) => <TodosListItem key={index} {...todo} {...props}/> )
   // _.map(this.props.todos, 
   // (todo, index) => <TodosListItem key={index} {...todo} {...props}/> )
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
TodosList.defaultProps = {
  todos: React.PropTypes.array.isRequired,
  toggleTask:  React.PropTypes.func.isRequired,
  saveTask: React.PropTypes.func.isRequired,
  deleteTask: React.PropTypes.func.isRequired
}

class TodosListItem extends React.Component {
  constructor() {
    super();
    this.state = {
      isEditing: false
    };
  }
  onSaveClick(event) {
    event.preventDefault();
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
          <button onClick={this.onSaveClick.bind(this)}>Save</button>
          <button onClick={this.onCancelClick.bind(this)}>Cancel</button>
        </td>
      );
    } return (
        <td>
          <button onClick={this.onEditClick.bind(this)}>Edit</button>
          <button onClick={this.props.deleteTask.bind(this, this.props.task)}>Delete</button>
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

const TodosListFooter = () => {
  return (
    <div>
     <p>Note:&nbsp;&nbsp;Green = "done"; Red = "pending"... <br/>
        &emsp;&emsp;&nbsp;&nbsp;&nbsp;Click on task to toggle status.</p>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));