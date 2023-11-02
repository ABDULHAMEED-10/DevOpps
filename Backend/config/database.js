const mongoose = require("mongoose");
const connectDataBase = () => {
    mongoose.connect("mongodb+srv://hr:hr@cluster0.zjrls7j.mongodb.net/DevOppsAssign", {
        useNewUrlParser: true, useUnifiedTopology: true
      
    }).then((data) => {
        console.log(`mongoDb connected with Server: ${data.connection.host}`);
    });
}

module.exports = connectDataBase