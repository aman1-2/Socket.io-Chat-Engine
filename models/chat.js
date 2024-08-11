const mongoose = require('mongoose');

const chatSchema = new mongoose({
    content: {
        type: String
    },

    user: {
        type: String
    },
    
    room: {
        type: String
    }
});

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;