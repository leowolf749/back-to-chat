

module.exports = Backbone.Model.extend({
    
    defaults: {
        username: 'chatterbot451',
        message: 'hello',
    },

    addNewMessage(message) {
        this.set('message', message);
        this.save();
    }
})