const Event = require("../model/Event");
const Step = require("../model/Step")

const checkAndUpdateStepCompletion = async (event) => {
    if (!event.step) {
        return;
    }

    const relatedEvents = await Event.find({
        step: event.step,
        status: 'done'
    })

    const totalDoneHours = relatedEvents.reduce((sum, ev) => {
        const duration = (new Date(ev.end) - new Date(ev.start)) / (1000 * 60 * 60);
        return sum + duration;
    }, 0);

    const step = await Step.findById(event.step);
    if (!step) {
        return;
    }
    if (totalDoneHours >= step.estimatedHours && !step.completed) {
        step.completed = true;
        await step.save();
    }

}

const getAllEvents = async (req, res) => {
    try {
        const userId = req.user.id;
        const events = await Event.find({ user: userId });
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createEvent = async (req, res) => {
    try {
        const newEvent = new Event({ ...req.body, user: req.user.id });
        const saved = await newEvent.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateEvent = async (req, res) => {
    try {
        const updatedEvent = await Event.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            req.body,
            { new: true }
        );

        if(updatedEvent.steps) {
            await checkAndUpdateStepCompletion(updatedEvent);
        }

        if (!updatedEvent) {
            return res.status(404).json({ error: "Event not found!" });
        }

        res.status(200).json(updatedEvent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteEvent = async (req, res) => {
    try {
        const deletedEvent = await Event.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!deletedEvent) {
            return res.status(404).json({ error: "Event not found" });
        }

        res.status(200).json({ message: "Event deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllEvents,
    createEvent,
    updateEvent,
    deleteEvent,
};
