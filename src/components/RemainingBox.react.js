var React = require('react');
var TodoStore = require('../stores/TodoStore.js');

var RemainingBox = React.createClass({
    handleOnClick: function (event) {
        event.preventDefault();
        this.props.onArchive();
    },

    render: function () {
        var todoList = TodoStore.getAll();
        var remaining = 0;
        var length = Object.keys(todoList).length;
        if (length > 0) {
            for (var key in todoList) {
                remaining += todoList[key].complete ? 0 : 1;
            }
        }

        return (
            <p>
                {remaining} of {length} remaining [ <a href="#" onClick={ this.handleOnClick }> archive </a> ]
            </p>
        );
    }
});

module.exports = RemainingBox;