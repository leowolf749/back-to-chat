// const MessageModel = require('./models/message');
const MessageList = require('./models/messagelist');
const MessageView = require('./views/message');

window.addEventListener('load', function () {
    // const message = new MessageModel();
    const list = new MessageList();
    list.fetch();
    

    const view = new MessageView({
        el: document.querySelector('body'),
        model: list,
    });

    view.render();
});

Backbone.sync = function (method, model) {
    if (method === 'create' || method === 'update') {

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
                msg = new MessageList(); 
                msg.set('from', response.chats[i].from);
                msg.set('message', response.chats[i].message);
                model.add(msg);
            }
            model.set('from', response.from);
            model.set('message', response.message);
            model.trigger('change');
            console.log(response);
        });
        request.send();
    }
};

