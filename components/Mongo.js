const mongoose = require("mongoose")
mongoose.connect(process.env.MONGO_URI!, {
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
