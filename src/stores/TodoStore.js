var AppDispatcher = reuqire('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TodoConstants = require('../constants/TodoConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

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

/**
 * Update all TODO item
 * @param {object} updates
 */
function updateAll(updates) {
    for (var id in _todos) {
        update(id, updates);
    }
}

/**
 * Delete a TODO item
 * @param {string} id
 */
function destroy(id) {
    delete _todos[id];
}

/**
 * Delete all the completed TODO item
 */
function destroyCompleted() {
    for (var id in _todos) {
        if (_todos[id].complete) {
            destroy(id);
        }
    }
}

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
    },

    dispatcherIndex: AppDispatcher.register(function(payload) {
        var action = payload.action;
        var text;

        switch(action.actionType) {
            case TodoConstants.TODO_CREATE:
                text = action.text.trim();
                if (text !== '') {
                    create(text);
                    TodoStore.emitChange();
                }
                break;

            case TodoConstants.TODO_DESTROY:
                destroy(action.id);
                TodoStore.emitChange();
                break;

            // add more cases for other actionTypes, like TODO_UPDATE, etc.
        }

        return true; // No errors. Needed by promise in Dispatcher.
    })

});

module.exports = TodoStore;