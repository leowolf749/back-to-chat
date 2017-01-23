
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

        this.model.createNew(newInput);
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
                    username: m.get('username'),
                    message: m.get('message'),
                }
            );
            const parent = this.el.querySelector('.chatbox');
            parent.appendChild(li);
        }
    }
});