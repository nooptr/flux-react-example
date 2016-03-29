var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var EventEmitter = require('events').EventEmitter;
var TodoConstants = require('../constants/TodoConstants.js');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

//var _todos = [
//    { id: 1, text: 'learning about react js and flux', complete: true },
//    { id: 2, text: 'make demo flux', complete: false },
//    { id: 3, text: 'presentation', complete: false }
//];

var _todos = {};

/**
 * Create a TODO iten
 * @param {string} text
 */
function create(text) {
    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    _todos[id] = {
        id: id,
        complete: false,
        text: text
    };
}

/**
 * Update a TODO item
 * @param {string} id
 * @param {object} updates An Object
 */
function update(id, updates) {
    _todos[id] = assign({}, _todos[id], updates);
}

function archive() {
    for (var key in _todos) {
        if (_todos[key].complete) {
            destroy(key);
        }
    }
}

/**
 * Delete a TODO item
 * @param {string} id
 */
function destroy(id) {
    delete _todos[id];
}

// We need EventEmitter to broadcast the change event to View
var TodoStore = assign({}, EventEmitter.prototype, {

    /**
     * Get the entire collection of TODOs.
     * @return {object}
     */
    getAll: function() {
        return _todos;
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

AppDispatcher.register(function(action) {
    switch (action.actionType) {
        case TodoConstants.TODO_CREATE:
            var text = action.text.trim();
            if (text !== '') {
                create(text);
                TodoStore.emitChange();
            }
            break;
        case TodoConstants.TODO_UPDATE:
            var id = action.id;
            var todo = _todos[id];
            todo.complete = todo.complete ? false : true;
            update(id, todo);
            TodoStore.emitChange();
            break;
        case TodoConstants.TODO_ARCHIVE:
            archive();
            TodoStore.emitChange();
            break;
        case TodoConstants.TODO_DESTROY:
            var id = action.id;
            destroy(id);
            TodoStore.emitChange();
            break;
        default:
            // no op
    }
});

module.exports = TodoStore;