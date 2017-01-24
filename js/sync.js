
module.exports = Backbone.sync = function (method, model) {
    if (method === 'create' || method === 'update') {
        const request = new XMLHttpRequest();
        request.open('POST', 'http://api.queencityiron.com/chats');

        let msg = {
            from: model.get('username'),
            message: model.get('message'),
        };

        request.send(JSON.stringify(msg));
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