var React = require('react');

var Todo = React.createClass({
    handleClick: function () {
        var todo = this.props.todo;
        this.props.onToggle(todo.id);
    },
    render: function () {
        var todo = this.props.todo;
        var liClassName = "complete-" + todo.complete;

        if (todo.complete) {
            return (
                <li key={todo.id}>
                    <input
                        type="checkbox"
                        onClick={ this.handleClick }
                        defaultChecked />
                    <span className={liClassName}>  {todo.text}</span>
                </li>
            );
        } else {
            return (
                <li key={todo.id}>
                    <input
                        type="checkbox"
                        onClick={this.handleClick} />
                    <span className={liClassName}>  {todo.text}</span>
                </li>
            );
        }
    }
});

module.exports = Todo;