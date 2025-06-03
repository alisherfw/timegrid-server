const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    start: { type: Date},
    end: {type: Date},
    allDay: { type: Boolean, default: false },
    isComplete: { type: Boolean, default: false },
    isRecurring: { type: Boolean, default: false },
    recurrencePattern: { 
        type: String, 
        enum: ["daily", "weekly", "monthly", "yearly"],
    },
    category: { type: String },
    description: { type: String },
    backgroundColor: { type: String },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "done", "missed"],
        default: "pending"
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "medium"
    }
}, {timestamps: true})

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;