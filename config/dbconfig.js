const mongoose = require('mongoose');

const dbConnect = async () => {
    await mongoose.connect("mongodb://localhost/CHAT_ENGINE_DB");
    console.log("Db connected Succesfully.");
}

module.exports = dbConnect;