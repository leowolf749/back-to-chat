const MessageModel = require('./message');

module.exports = Backbone.Collection.extend({

    model: MessageModel,

    createNew: function (newInput) {
        const newMessage = new MessageModel;
        newMessage.set('message', newInput);

        this.add(newMessage);
    }
});