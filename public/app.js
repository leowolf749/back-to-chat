(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// const MessageModel = require('./models/message');
const MessageList = require('./models/messagelist');
const MessageView = require('./views/message');

window.addEventListener('load', function () {
    // const message = new MessageModel();
    const list = new MessageList();

    const view = new MessageView({
        el: document.querySelector('body'),
        model: list,
    });
    view.render();
});

Backbone.sync = function (method, model) {
    if (method === 'create' || method === 'update') {
        // console.log('frum')
        // console.log(model.get('from'));
        const request = new XMLHttpRequest();
        request.open('POST', 'http://api.queencityiron.com/chats');

        let message = {
            from: model.get('from'),
            message: model.get('message'),
        };

        request.send(JSON.stringify(message));
        // console.log('sending message');
    }

    if (method === 'read') {
        const request = new XMLHttpRequest();
        request.open('GET', 'http://api.queencityiron.com/chats');
        request.addEventListener('load', function () {
            const response = JSON.parse(request.responseText);

            for (let i = 0; i < response.chats.length; i++) {
                // 
                // msg = new ChatModel(); <=== make a new ChatModel for each of response.chats
                // msg.set('from', response.chats[i].from);
                // model.add(that ChatModel from above)
            }
            // model.set('name', response.name);
            // model.set('attendees', response.attendees);
            // model.set('when', response.when);
            // model.trigger('change');
        });
        request.send();
    }
};


},{"./models/messagelist":3,"./views/message":4}],2:[function(require,module,exports){

module.exports = Backbone.Model.extend({
    
    defaults: {
        from: 'iamrobot',
        message: null,
    },

    // addNewMessage(message) {
    //     this.set('message', message);
    //     // this.save();
    // }
})
},{}],3:[function(require,module,exports){
const MessageModel = require('./message');

module.exports = Backbone.Collection.extend({

    model: MessageModel,

    createNew: function (message, from) {
        const newMessage = new MessageModel();
        newMessage.set('message', message);
        newMessage.set('from', from);

        this.add(newMessage);
        newMessage.save();
    }
});
},{"./message":2}],4:[function(require,module,exports){

module.exports = Backbone.View.extend({
    initialize: function () {
        this.model.on('change', this.render, this);
        this.model.on('add', this.render, this);
    },

    events: {
        'click #send': 'sendNewMessage',
    },

    sendNewMessage: function () {
        const newInput = this.el.querySelector('#message').value;
        const newUser = this.el.querySelector('#username').value;

        this.model.createNew(newInput, newUser);
        // this.model.sync('create', this.model);
        console.log(newInput);
    },

    render: function () {
        // console.log('rendering');
        const template = document.querySelector('#message-template').innerHTML;
        
        this.el.querySelector('.chatbox').innerHTML = '';

        for (let i = 0; i < this.model.models.length; i++) {
            const m = this.model.models[i];

            const li = document.createElement('li');
            li.innerHTML = Mustache.render(
                template,
                {
                    username: m.get('from'),
                    message: m.get('message'),
                }
            );
            const parent = this.el.querySelector('.chatbox');
            parent.appendChild(li);
        }
    }
});
},{}]},{},[1]);
