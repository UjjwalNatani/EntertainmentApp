const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://ujjwalnatani10:Ugnatani@cluster0.ijnxryd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    // mongoose.connect("mongodb://localhost:27017/entertainment_app")
    .then(() => {
        console.log("mongodb connected");
    })
    .catch((e) => {
        console.log('failed', e);
    })


const newSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const collection = mongoose.model("user_data", newSchema)

module.exports = collection
