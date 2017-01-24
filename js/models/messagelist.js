const MessageModel = require('./message');

module.exports = Backbone.Collection.extend({

    model: MessageModel,

    createNew: function (message, from) {
        const newMessage = new MessageModel;
        newMessage.save('message', message);
        newMessage.save('from', from);

        this.add(newMessage);
    }
});