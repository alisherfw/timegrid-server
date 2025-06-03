const mongoose = require('mongoose')

const GoalSchema = new mongoose.Schema({
    title: String,
    description: String,
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
    }
})

const Goal = mongoose.model("Goal", GoalSchema)

module.exports = Goal