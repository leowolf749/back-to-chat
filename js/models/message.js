

module.exports = Backbone.Model.extend({
    
    defaults: {
        username: 'chatterbot1',
        message: 'hello',
    },

    addNewMessage(message) {
        this.set('message', message);
        this.save();
    }
})