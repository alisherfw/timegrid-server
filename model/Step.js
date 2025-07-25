const mongoose = require('mongoose')

const StepSchema = new mongoose.Schema({
    goal: { type: mongoose.Schema.Types.ObjectId, ref: "Goal", required: true },
    title: {type: String, required: true},
    description: String,
    estimatedHours: Number,
    completed: { type: Boolean, default: false },
    order: {type: Number, default: 0}
}, {timestamps: true})

const Step = mongoose.model("Step", StepSchema)

module.exports = Step
