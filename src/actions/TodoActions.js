var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var TodoConstants = require('../constants/TodoConstants.js');

var TodoActions = {
    create: function(text) {
        AppDispatcher.dispatch({
            actionType: TodoConstants.TODO_CREATE,
            text: text
        });
    },

    update: function(todo) {
        var id = todo.id;
        var actionType = TodoConstants.TODO_UPDATE;

        AppDispatcher.dispatch({
            actionType: actionType,
            id: id
        });
    },

    archive: function() {
        var actionType = TodoConstants.TODO_ARCHIVE;

        AppDispatcher.dispatch({
            actionType: actionType
        });
    },

    destroy: function(id) {
        AppDispatcher.dispatch({
            actionType: TodoConstants.TODO_DESTROY,
            id: id
        });
    }
};

module.exports = TodoActions;