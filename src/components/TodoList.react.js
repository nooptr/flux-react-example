var React = require('react');
var Todo = require('./Todo.react.js');
var TodoStore = require('../stores/TodoStore.js');

var TodoList = React.createClass({
    handleToggle: function (id) {
        this.props.onChange(id);
    },
    render: function () {
        var todoList = [];
        var savedTodoList = TodoStore.getAll();
        for (var key in savedTodoList) {
            todoList.push(<Todo key={ key } todo={ savedTodoList[key] } onToggle={ this.handleToggle } />);
        }

        var divStyle = {
            marginTop: '10px'
        };

        return (
            <div style={divStyle}>
                <ul>{ todoList }</ul>
            </div>
        );
    }
});
module.exports = TodoList;