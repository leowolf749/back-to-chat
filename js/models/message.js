
module.exports = Backbone.Model.extend({
    
    defaults: {
        username: 'iamrobot -_-',
        message: 'hello',
    },

    addNewMessage(message) {
        this.set('message', message);
        this.save();
    }
})