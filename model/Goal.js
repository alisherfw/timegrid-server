const mongoose = require('mongoose')

const GoalSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
    }
})

const Goal = mongoose.model("Goal", GoalSchema)

module.exports = Goal