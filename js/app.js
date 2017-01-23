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