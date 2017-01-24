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