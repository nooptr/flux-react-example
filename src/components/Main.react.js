var React = require('react');
var ReactDOM = require('react-dom');
var Input = require('react-bootstrap').Input;
var Button = require('react-bootstrap').Button;

var TodoInput = require('./TodoInput.react.js');
var Todo = require('./Todo.react.js');
var RemainingBox = require('./RemainingBox.react.js');
var TodoList = require('./TodoList.react.js');

var TodoStore = require('../stores/TodoStore.js');
var TodoActions = require('../actions/TodoActions.js');

function getTodoState() {
    return {
        savedTodoList: TodoStore.getAll()
    }
}

var Main = React.createClass({
    getInitialState: function () {
        return {
            savedTodoList: []
        };
    },

    componentWillMount: function() {
        this.setState({
            savedTodoList: TodoStore.getAll()
        })
    },

    componentDidMount: function() {
        TodoStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        TodoStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
        this.setState(getTodoState());
    },

    handleSaveTodo: function (todo) {
        TodoActions.create(todo.text);
    },

    handleOnArchive: function () {
        TodoActions.archive();
    },

    handleChange: function (id) {
        var todoList = TodoStore.getAll();
        var todo = todoList[id];
        TodoActions.update(todo);
    },

    render: function() {
        return (
            <div>
                <RemainingBox
                    onArchive={ this.handleOnArchive }
                />
                <TodoInput
                    onSaveTodo={ this.handleSaveTodo } />
                <TodoList
                    onChange={ this.handleChange } />
            </div>
        );
    }
});

module.exports = Main;